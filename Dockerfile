FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json . 
RUN npm install
COPY . .
RUN npm audit fix
CMD [ "node", "app.js" ]
