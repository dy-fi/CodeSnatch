FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json . 
RUN npm install
RUN npm audit fix
COPY . .
CMD [ "node", "app.js" ]
