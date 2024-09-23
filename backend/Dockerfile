FROM node:18

WORKDIR /usr/src/app

RUN npm install -g json-server@0.17.4

COPY ./db.json ./db.json

EXPOSE 3000

CMD ["json-server", "--id", "codigo_cliente", "--watch", "./db.json", "--port", "3000", "--host", "0.0.0.0"]
