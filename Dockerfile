FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV NODE_ENV production

ENV TEST foo

EXPOSE 3000

CMD [ "npx", "serve", "build" ]