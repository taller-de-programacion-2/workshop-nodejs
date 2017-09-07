FROM node:boron

WORKDIR /home/app

COPY app/ ./

RUN yarn install

COPY web ./web

RUN cd web && \
    yarn install && \
    yarn build && \
    cp -r build ../public && \
    cd -

EXPOSE 8080

CMD ["yarn","start"]
