# 1. Use Node
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy source
COPY . .

# 6. Build the app
RUN npm run build

# 7. Expose port (Cloud Run injects PORT)
EXPOSE 8080

# 8. Start the app
CMD ["node", "dist/main.js"]

