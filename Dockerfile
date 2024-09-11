FROM node:16-alpine3.18

WORKDIR "/app"

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install --silent
RUN npm i -g serve

COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]
