FROM node:8

ENV HOME=/home/app

WORKDIR $HOME

COPY app/package.json app/index.js $HOME/


RUN npm install

EXPOSE 8080

CMD ["npm","start"]
