FROM node:14-alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . /usr/src

RUN npm ci --only=production

RUN npm run build
EXPOSE 3000
CMD npm run start