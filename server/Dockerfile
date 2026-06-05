FROM oven/bun:1.1-alpine
WORKDIR /usr/src/app

# The asterisk (*) makes the lockfile optional so it won't crash if missing
COPY package.json bun.lockb* package-lock.json* yarn.lock* ./

# Installs production dependencies cleanly without generating a heavy UI progress bar
RUN bun install --production --no-progress

COPY . .

EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]