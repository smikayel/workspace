FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN mv .env.prod.example .env

RUN npm run build

ENTRYPOINT ["npm", "start"]
