# Use official Node.js image as base
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code into container
COPY . .

# Build the project
RUN npm run build

# Expose port that application runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
