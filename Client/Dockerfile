FROM node:20-alpine

WORKDIR /app

COPY package.json .

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "serve", "-l", "80", "-s", "dist" ]