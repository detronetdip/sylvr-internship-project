FROM node:alpine as builder
WORKDIR /app
COPY package.* .
RUN npm install --omit=dev
RUN npm i -g typescript
COPY . .
RUN npm run build

FROM node:18-alpine3.15
WORKDIR /app
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/build/ .
CMD ["node","index.js"]