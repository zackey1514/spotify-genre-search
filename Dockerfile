### BUILD
FROM oven/bun:1.0.18-debian AS build

WORKDIR /app

COPY ./package.json ./bun.lockb ./
RUN bun i --frozen-lockfile

COPY . /app

RUN bun run build

### PRODUCTION
FROM oven/bun:1.0.18-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/bun.lockb ./
COPY --from=build /app/build ./build

RUN bun i -p --frozen-lockfile

CMD ["bun", "--bun", "run", "build"]
