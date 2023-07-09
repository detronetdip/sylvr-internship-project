FROM node:alpine as builder
WORKDIR /app
COPY package.* .
RUN npm install
COPY . .
CMD ["npm","run","dev"]
