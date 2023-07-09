FROM node as builder
WORKDIR /app
COPY package.* .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17-slim
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
