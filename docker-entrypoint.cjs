'use strict'

const http = require('node:http')
const { randomUUID } = require('node:crypto')

const enableAdvancedLogging = process.env.ENABLE_ADVANCED_LOGGING !== 'false'
const logStaticRequests = process.env.LOG_STATIC_REQUESTS === 'true'
const appName = process.env.APP_NAME || 'zaneenterprise'

function nowIso() {
  return new Date().toISOString()
}

function toNumber(value, fallback) {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

function shouldLogRequest(pathname) {
  if (pathname === '/health' || pathname === '/health/') return false
  if (logStaticRequests) return true
  return !pathname.startsWith('/_next/')
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || ''
}

function log(level, event, data = {}) {
  const payload = {
    ts: nowIso(),
    level,
    event,
    app: appName,
    pid: process.pid,
    ...data,
  }

  const line = JSON.stringify(payload)
  if (level === 'error' || level === 'fatal' || level === 'warn') {
    console.error(line)
    return
  }
  console.log(line)
}

function installProcessHandlers() {
  process.on('uncaughtException', (error) => {
    log('fatal', 'process.uncaught_exception', {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
    })
  })

  process.on('unhandledRejection', (reason) => {
    const maybeError = reason instanceof Error ? reason : null
    log('fatal', 'process.unhandled_rejection', {
      message: maybeError?.message || String(reason),
      stack: maybeError?.stack,
    })
  })

  process.on('SIGTERM', () => {
    log('warn', 'process.signal', { signal: 'SIGTERM' })
  })

  process.on('SIGINT', () => {
    log('warn', 'process.signal', { signal: 'SIGINT' })
  })
}

function patchHttpServerLogging() {
  const originalCreateServer = http.createServer

  http.createServer = function patchedCreateServer(...args) {
    const maybeListener = args[args.length - 1]
    if (typeof maybeListener === 'function') {
      args[args.length - 1] = function wrappedRequestListener(req, res) {
        const startNs = process.hrtime.bigint()
        const requestId =
          (typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id']) || randomUUID()

        res.setHeader('x-request-id', requestId)

        const method = req.method || 'UNKNOWN'
        const url = req.url || '/'
        const pathname = url.split('?')[0] || '/'
        const shouldLog = shouldLogRequest(pathname)

        if (shouldLog) {
          log('info', 'http.request.start', {
            request_id: requestId,
            method,
            url,
            path: pathname,
            host: req.headers.host || '',
            ip: getClientIp(req),
            user_agent: req.headers['user-agent'] || '',
          })
        }

        res.on('finish', () => {
          if (!shouldLog) return
          const durationMs = Number(process.hrtime.bigint() - startNs) / 1_000_000
          log('info', 'http.request.finish', {
            request_id: requestId,
            method,
            url,
            status: res.statusCode,
            duration_ms: Math.round(durationMs * 100) / 100,
            bytes_written: toNumber(res.getHeader('content-length'), undefined),
          })
        })

        res.on('close', () => {
          if (!shouldLog || res.writableEnded) return
          const durationMs = Number(process.hrtime.bigint() - startNs) / 1_000_000
          log('warn', 'http.request.aborted', {
            request_id: requestId,
            method,
            url,
            duration_ms: Math.round(durationMs * 100) / 100,
          })
        })

        return maybeListener(req, res)
      }
    }

    const server = originalCreateServer.apply(this, args)
    server.on('error', (error) => {
      log('error', 'http.server.error', {
        message: error?.message || 'Unknown server error',
        stack: error?.stack,
      })
    })

    return server
  }
}

function logStartup() {
  log('info', 'startup', {
    node_version: process.version,
    env: process.env.NODE_ENV || '',
    port: process.env.PORT || '',
    hostname: process.env.HOSTNAME || '',
    advanced_logging: enableAdvancedLogging,
    env_present: {
      next_public_posthog_key: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
      next_public_posthog_host: Boolean(process.env.NEXT_PUBLIC_POSTHOG_HOST),
    },
  })
}

function start() {
  installProcessHandlers()
  if (enableAdvancedLogging) {
    patchHttpServerLogging()
  }
  logStartup()

  try {
    require('./server.js')
  } catch (error) {
    log('fatal', 'startup.failure', {
      message: error?.message || 'Failed to load Next standalone server',
      stack: error?.stack,
    })
    process.exit(1)
  }
}

start()
