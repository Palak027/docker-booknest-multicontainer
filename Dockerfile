FROM node
RUN adduser --disabled-password --gecos '' appuser
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt update && apt install -y iputils-ping
COPY . . 
USER appuser
EXPOSE 3000
CMD ["node","app.js"]

