FROM node:18
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./server ./server
COPY ./old-public ./old-public
CMD ["npm", "start"]