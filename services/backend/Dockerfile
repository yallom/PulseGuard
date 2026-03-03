FROM oven/bun:1.3.5-alpine

#apontar para a root do projeto
WORKDIR /app

#copiar ficheiros de configuração da root
COPY package.json bun.lock ./

#copiar apenas os workspaces necessários
COPY services/backend ./services/backend
COPY packages/shared ./packages/shared

#filtrar os packages a instalar
RUN bun install --filter=./services/backend...

# Switch into backend workspace
WORKDIR /app/services/backend

# Generate prisma client
RUN bunx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate deploy && bun dev"]