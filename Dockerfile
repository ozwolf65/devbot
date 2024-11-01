FROM node:16-alpine3.18

WORKDIR "/app"

ENV PATH=/app/node_modules/.bin:$PATH
ENV node_env="production"

COPY package.json ./
RUN npm install --silent

COPY . .
RUN npm run build
EXPOSE $PORT
CMD [ "npm", "run", "preview" ]
