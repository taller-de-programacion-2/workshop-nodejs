FROM node:boron

WORKDIR /home/app

COPY app/* ./

RUN npm install

EXPOSE 8080

CMD ["npm","start"]
