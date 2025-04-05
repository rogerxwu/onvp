# Use the official Node.js image with Alpine Linux for a minimal base image
FROM node:20-alpine as base

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json files to leverage Docker caching for dependency installation
COPY package*.json ./

# Expose the port that the application will run on
EXPOSE 3000

# Define a build stage to build the application
FROM base as builder

# Install dependencies (including devDependencies)
RUN npm install

# Set the working directory inside the container
WORKDIR /app

# Copy the entire application code to the container
COPY . .

# Install dependencies and build the Next.js application
RUN npm run build

# Define a production stage to set up the production environment
FROM base as prod

# Set the working directory inside the container
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

RUN npm ci --only=production

# Copy necessary files from the builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Start the Next.js application in production mode
CMD ["npm", "start"]

# Define a development stage to set up the development environment
FROM base as dev

# Set the environment to development
ENV NODE_ENV=development

# Install dependencies for development
RUN npm install

# Copy the entire application code to the container
COPY . .

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]
