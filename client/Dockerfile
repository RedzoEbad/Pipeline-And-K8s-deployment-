# FROM node:16-alpine
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci --legacy-peer-deps
# COPY . .
# RUN npm run build

# build stage
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build


# production stage
FROM nginx:alpine

# react-scripts outputs to `build`, not `dist`
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]