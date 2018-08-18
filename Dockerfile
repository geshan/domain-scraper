FROM node:10-alpine

RUN npm install -g nodemon

WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm install
COPY . /src

CMD ["node", "index.js"]
