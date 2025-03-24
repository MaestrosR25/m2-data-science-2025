# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ /app

# For build
FROM development AS build
RUN npm run build
CMD ["npm", "run", "build"]

# 2. For Nginx setup
FROM nginx:alpine

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]