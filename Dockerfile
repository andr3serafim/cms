FROM node:22.13.0-alpine

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start"]