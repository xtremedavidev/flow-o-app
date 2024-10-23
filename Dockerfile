FROM node:20-alpine3.18 as builder

RUN npm install -g pnpm

WORKDIR /app
COPY package*.json ./
RUN pnpm install --production
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]