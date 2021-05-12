FROM node:14

# Update system libraries
RUN apt-get update

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies
COPY package.json ./
RUN npm install

# Bundle application source
COPY . .

EXPOSE 3000

RUN apt-get install nginx -y

COPY ./demo /var/www/html/

EXPOSE 80

CMD bash -c "service nginx start && node src/server.js"
