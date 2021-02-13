FROM mhart/alpine-node:10.19 AS builder

ARG FB_SA_KEY
ARG BACKEND

WORKDIR /srv

COPY . .

# Add backend path
RUN rm -rf keys/url.json
RUN echo "\"$BACKEND"\" > keys/url.json

# Add firebase config
RUN mkdir -p ./keys && echo $FB_SA_KEY > ./keys/firebase.config.json

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh libc6-compat autoconf automake libtool make tiff jpeg zlib zlib-dev pkgconf nasm file gcc musl-dev

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

RUN npm run build

# use lighter image
FROM mhart/alpine-node:slim-10.19
RUN apk add libc6-compat
COPY --from=builder /srv .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node","node_modules/.bin/next", "start"]