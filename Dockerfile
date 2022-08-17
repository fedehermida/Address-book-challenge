#DEVELOPMENT ENVIRONMENT
FROM node:16-alpine AS development
WORKDIR /workspace
COPY package*.json /workspace/
COPY . .
RUN npm install
RUN npm run build