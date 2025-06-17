FROM node:23.4-alpine3.21

WORKDIR /app

COPY Server/package.json ./ 
COPY Server/package-lock.json ./ 
RUN npm install

COPY Server .

EXPOSE 4000

CMD ["npm", "run", "dev"]
