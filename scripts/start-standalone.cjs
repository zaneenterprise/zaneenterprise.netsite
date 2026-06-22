'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { spawn } = require('node:child_process')

const rootDir = path.resolve(__dirname, '..')
const standaloneDir = path.join(rootDir, '.next', 'standalone')
const standaloneNextDir = path.join(standaloneDir, '.next')
const serverPath = path.join(standaloneDir, 'server.js')

function copyIfExists(source, destination) {
  if (!fs.existsSync(source)) return
  fs.rmSync(destination, { recursive: true, force: true })
  fs.cpSync(source, destination, { recursive: true })
}

if (!fs.existsSync(serverPath)) {
  console.error('Missing .next/standalone/server.js. Run `pnpm build` before `pnpm start`.')
  process.exit(1)
}

fs.mkdirSync(standaloneNextDir, { recursive: true })
copyIfExists(path.join(rootDir, '.next', 'static'), path.join(standaloneNextDir, 'static'))
copyIfExists(path.join(rootDir, 'public'), path.join(standaloneDir, 'public'))

const child = spawn(process.execPath, [serverPath], {
  cwd: standaloneDir,
  env: process.env,
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
