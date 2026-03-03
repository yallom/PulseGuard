FROM oven/bun:1.1

#apontar para a root do projeto
WORKDIR /app

#copiar ficheiros de configuração da root
COPY package.json bun.lock ./

#copiar apenas os workspaces necessários
COPY services/mobile ./services/mobile
COPY packages/shared ./packages/shared

#filtrar os packages a instalar
RUN bun install --filter=./services/mobile...

WORKDIR /app/services/mobile

# Expose mobile port
EXPOSE 5171

# Start development server
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]