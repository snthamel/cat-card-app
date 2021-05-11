FROM node:10

# Update system libraries
RUN apt-get update

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies
COPY package.json ./
RUN npm install

# Bundle application source
COPY ./src ./src
COPY ./demo ./demo


EXPOSE 3000
CMD ["node", "src/app.js"]
