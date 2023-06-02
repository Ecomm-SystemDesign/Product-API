FROM node:14

LABEL maintainer="jerryrenn"

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]