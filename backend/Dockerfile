FROM node:18.14.1

EXPOSE 8080
COPY package.json package.json
RUN npm install
COPY src src
CMD ["node","src/app.js"]