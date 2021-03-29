# base image
FROM node:10.23.0-stretch as builder

# ### ARGS ------------------>
# ### ARGS ------------------>
ARG FB_SA_KEY
ARG BACKEND
ARG PAYPAL_ID
ARG AMPLITUDE_KEY
ARG GTAG

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# Add firebase config
RUN mkdir -p /usr/src/keys && echo $FB_SA_KEY > /usr/src/keys/firebase.config.json

# install dependencies
RUN yarn

# Backend url
ENV NEXT_PUBLIC_API_URL=$BACKEND
ENV NEXT_PUBLIC_PAYPAL_ID=$PAYPAL_ID
ENV NODE_ENV=production
ENV NEXT_PUBLIC_AMPLITUDE_KEY=$AMPLITUDE_KEY
ENV NEXT_PUBLIC_GTAG=$GTAG

# Save all env to dotenv
RUN printenv | sed 's/\([^=]*=\)\(.*\)/\1"\2"/' > /usr/src/.env

# Export static HTML
RUN yarn export

FROM mhart/alpine-node:slim-10.19
COPY --from=builder /usr/src .
ENV NODE_ENV=production
EXPOSE 80
CMD ["node","node_modules/.bin/serve", "-d", "out", "-p", "80"]
