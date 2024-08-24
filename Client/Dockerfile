FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm install

COPY . .

RUN npm run build



FROM nginx

EXPOSE 443

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./nginx/certs/ /etc/nginx/certs/

COPY --from=build /app/dist /usr/share/nginx/html