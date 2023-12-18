### BUILD
FROM node:20.10.0-bullseye AS build

WORKDIR /app

COPY ./package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --immutable --immutable-cache

COPY . /app

RUN yarn run build

### PRODUCTION
FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/build ./build

RUN yarn install --production --immutable --immutable-cache

CMD ["node", "build"]
