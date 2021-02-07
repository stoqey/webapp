FROM mhart/alpine-node:10.19 AS builder

ARG NPM_AUTH_TOKEN
ARG FB_SA_KEY_TS

WORKDIR /srv

COPY . .
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh libc6-compat
RUN npm config set @stoqeyx:registry https://npm.pkg.github.com
RUN npm config set //npm.pkg.github.com/:_authToken=$NPM_AUTH_TOKEN

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

RUN mkdir -p src/keys && echo $FB_SA_KEY_TS > src/keys/config.ts

RUN npm run build

# use lighter image
FROM mhart/alpine-node:slim-10.19
RUN apk add libc6-compat
COPY --from=builder /srv .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node","node_modules/.bin/next", "start"]