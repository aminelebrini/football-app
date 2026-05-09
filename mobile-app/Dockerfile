# Mobile App (Ionic/Capacitor) Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8100
CMD ["npx", "ionic", "serve", "--host=0.0.0.0", "--port=8100", "--disable-host-check"]
