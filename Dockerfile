FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt update && apt install -y iputils-ping
COPY . . 
EXPOSE 3000
CMD ["node","app.js"]

