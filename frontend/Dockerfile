# Usar multistage build para reduzir o tamanho da imagem final
FROM node:alpine AS builder

WORKDIR /src/index

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

# Criar imagem final com apenas os arquivos necessários
FROM node:alpine
WORKDIR /src/index
COPY --from=builder /src/app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start"]
