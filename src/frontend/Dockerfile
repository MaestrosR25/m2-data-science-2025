# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:20.18.2 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ /app
ENV CI=true

# For build
FROM development AS deploy
EXPOSE 3000
CMD ["sh", "-c", "npm start & tail -f /dev/null"]