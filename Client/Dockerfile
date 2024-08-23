FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "serve", "-l", "80", "-s", "dist" ]