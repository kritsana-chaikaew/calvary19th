FROM node:14-alpine

RUN mkdir -p /usr/src
RUN mkdir -p /usr/src/data/.db
RUN mkdir -p /usr/src/data/upload
WORKDIR /usr/src

COPY . /usr/src

RUN npm install --global pm2
RUN apk --no-cache --virtual build-dependencies add \
        python \
        make \
        g++ \
&& npm ci --only=productionn \
&& apk del build-dependencies

RUN npm run build
EXPOSE 3000
CMD [ "pm2-runtime", "npm", "--", "start" ]