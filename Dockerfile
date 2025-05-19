FROM node:18-slim
WORKDIR /app

COPY ./package*.json ./

RUN npm ci
RUN npx puppeteer browsers install chrome

EXPOSE 3001
CMD ["npm", "start"]