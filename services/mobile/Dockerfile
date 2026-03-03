FROM oven/bun:1.1

WORKDIR /app

# Copy package files
COPY package*.json bun.lockb* ./

# Clean install
RUN rm -rf node_modules && bun install

# Copy source code
COPY . .

# Expose Vite default port
EXPOSE 5171

# Start development server
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]