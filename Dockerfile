# Dockerfile

# base image
FROM node:10.23.0-stretch as builder

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

ENV NODE_ENV=production
# start app
RUN npm run build

# use lighter image
FROM pierrezemb/gostatic

COPY --from=builder /usr/src/out /srv/http
EXPOSE 80