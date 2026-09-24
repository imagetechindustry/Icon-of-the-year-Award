FROM node:23-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the standard port the server uses
EXPOSE 5001

# Start the server
CMD ["npm", "start"]
