FROM node

# Create the appuser
RUN adduser --disabled-password --gecos '' appuser

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./
RUN npm install

# Install additional dependencies
RUN apt update && apt install -y iputils-ping

# Copy the rest of the application files
COPY . .

# Change the ownership of /app to appuser before switching users
RUN chown -R appuser /app

# Switch to appuser
USER appuser

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["node", "app.js"]

# Add health check
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1
