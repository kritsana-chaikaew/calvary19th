FROM node:14-alpine

RUN mkdir -p /usr/src
RUN mkdir -p /usr/src/data/.db
RUN mkdir -p /usr/src/data/upload
WORKDIR /usr/src

COPY . /usr/src

RUN npm ci --only=production

RUN npm run build
EXPOSE 3000
CMD npm run start