FROM oven/bun:1.1

#apontar para a root do projeto
WORKDIR /app

#copiar ficheiros de configuração da root
COPY package.json bun.lock ./

#copiar apenas os workspaces necessários
COPY services/web ./services/web
COPY packages/shared ./packages/shared

#filtrar os packages a instalar
RUN bun install --filter=./services/web...

WORKDIR /app/services/web

# Expose web port
EXPOSE 5173

# Start development server
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]