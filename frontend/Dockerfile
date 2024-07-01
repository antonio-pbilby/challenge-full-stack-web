FROM node:20 AS builder
WORKDIR /app
COPY ./frontend ./
RUN npm install
RUN npm run build

FROM node:20
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "start"]