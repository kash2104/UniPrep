FROM node:23.4-alpine3.21

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./ 
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
