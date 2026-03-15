# Use Node.js 22.14.0 LTS for stability and compatibility with Cloudflare Pages
FROM node:22.14.0-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Allow NEXT_PUBLIC_* variables to be provided at build-time
ARG NEXT_PUBLIC_POSTHOG_KEY=""
ARG NEXT_PUBLIC_POSTHOG_HOST=""
ARG NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=""
ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}
ENV NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=${NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}

RUN pnpm run build

# Production stage - use minimal node alpine
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build (includes server.js and required node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Debug: List files to confirm server.js exists
RUN ls -la /app/ && echo "--- Checking for server.js ---" && test -f /app/server.js

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Runtime env passthrough defaults
ENV NEXT_PUBLIC_POSTHOG_KEY=""
ENV NEXT_PUBLIC_POSTHOG_HOST=""
ENV NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=""

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/api/health" || exit 1

# Start the server
CMD ["node", "server.js"]
