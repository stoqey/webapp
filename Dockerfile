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

# # Add backend path
# RUN rm -rf keys/url.json
# RUN echo "\"$BACKEND"\" > keys/url.json

# Add paypal production

# Add firebase config
RUN mkdir -p ./keys && echo $FB_SA_KEY > ./keys/firebase.config.json

# install dependencies
RUN npm install

# Backend url
ENV NEXT_PUBLIC_API_URL=$BACKEND
ENV NEXT_PUBLIC_PAYPAL_ID=$PAYPAL_ID
ENV NODE_ENV=production
# Build app
RUN npm run build

# Export static HTML
RUN run run export

# use lighter image
FROM pierrezemb/gostatic

COPY --from=builder /usr/src/out /srv/http
EXPOSE 80