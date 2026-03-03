FROM oven/bun:1.1

WORKDIR /app

# Copy package files
COPY package*.json bun.lockb* ./

# Clean install
RUN bun install

# Copy source code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start development server
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]