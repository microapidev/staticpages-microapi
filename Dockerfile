# Tells the Docker which base image to start.
FROM node:12-alpine

# Adds files from the host file system into the Docker container.  
ADD . /app

# Sets the current working directory for subsequent instructions
WORKDIR /app

RUN npm cache clean
RUN npm install

#expose a port to allow external access
EXPOSE 5550

# Start mean application
CMD ["npm", "start"] 