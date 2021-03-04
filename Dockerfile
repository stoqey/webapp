# base image
FROM node:10.23.0-stretch as builder

# ### ARGS ------------------>
# ### ARGS ------------------>
ARG FB_SA_KEY
ARG BACKEND
ARG PAYPAL_ID

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# Add firebase config
RUN mkdir -p /usr/src/keys && echo $FB_SA_KEY > /usr/src/keys/firebase.config.json

# install dependencies
RUN npm install

# Backend url
ENV NEXT_PUBLIC_API_URL=$BACKEND
ENV NEXT_PUBLIC_PAYPAL_ID=$PAYPAL_ID
ENV NODE_ENV=production

# Save all env to dotenv
RUN printenv | sed 's/\([^=]*=\)\(.*\)/\1"\2"/' > /usr/src/.env

# Build app
RUN npm run build

# Export static HTML
RUN run run export

# use lighter image
FROM pierrezemb/gostatic

COPY --from=builder /usr/src/out /srv/http
EXPOSE 80