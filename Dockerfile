FROM node:boron

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build:web

EXPOSE 8080

CMD ["yarn","start:app"]
