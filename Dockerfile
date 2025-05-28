FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp
COPY package.json bun.lock /temp/
COPY patches /temp/patches
RUN cd /temp && bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp .
COPY svelte.config.js tsconfig.json vite.config.ts ./
COPY src ./src
COPY static ./static

ENV NODE_ENV=production
RUN bun test
RUN bun run build

FROM base AS release
COPY --from=prerelease /usr/src/app/build .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "./index.js" ]
