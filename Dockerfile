# Build Stage
FROM node:14-alpine AS builder

COPY . .

ARG NODE_ENV=production

RUN yarn install --production=false
RUN yarn build \
&& rm -rf node_modules

# Runtime Stage
FROM node:12-alpine

ENV APP_HOME=/usr/app
WORKDIR $APP_HOME

COPY --from=builder .next .next
COPY --from=builder public public
COPY --from=builder next.config.js .
COPY --from=builder package.json .
COPY --from=builder yarn.lock .

RUN yarn install --production=true

EXPOSE 3000
CMD ["yarn", "start"]