FROM node:18-slim
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./server ./server
COPY ./old-public ./old-public
EXPOSE 3001
CMD ["npm", "start"]