FROM node:18

WORKDIR /usr/src/app

RUN npm install -g json-server

COPY ./db.json ./db.json

EXPOSE 3000

CMD ["json-server", "--watch", "db.json", "--port", "3000"]
