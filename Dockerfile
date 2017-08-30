FROM node:8

ENV HOME=/home/app

COPY app/package.json app/index.js $HOME/app/

WORKDIR $HOME/app

RUN npm install

EXPOSE 8080


