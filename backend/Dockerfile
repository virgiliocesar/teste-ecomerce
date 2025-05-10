FROM node:alpine AS builder

WORKDIR /src/index

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Criar imagem final otimizada
FROM node:alpine
WORKDIR /src/index
COPY --from=builder /src/index .

EXPOSE 5000
CMD ["npm", "run", "start"]
