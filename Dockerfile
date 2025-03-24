FROM node:18-slim
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./server ./server
COPY ./old-public ./old-public
CMD ["npm", "start"]