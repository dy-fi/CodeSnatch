FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
VOLUME /etc/letsencrypt
EXPOSE 3000 80 443
CMD [ "node", "app.js" ]
