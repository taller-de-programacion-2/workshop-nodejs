FROM node:boron

WORKDIR /home/app

COPY app/package.json app/index.js app/rules.js ./

RUN npm install

EXPOSE 8080

CMD ["npm","start"]
