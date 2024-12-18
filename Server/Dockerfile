FROM node:23.4-alpine3.21

WORKDIR /app/Server

COPY package* .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]