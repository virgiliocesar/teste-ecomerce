# 🛠️ Project Documentation

## 🚀 Project Overview
Este projeto é uma plataforma de e-commerce que utiliza a arquitetura MERN (MongoDB, Express, React, Node.js). Ele é desenvolvido com um front-end dinâmico em React e um back-end robusto em Node.js com Express, utilizando MongoDB como banco de dados e Stripe para processamentos de pagamentos.

### Funcionalidades
- **Autenticação de Usuários** com JWT (JSON Web Token).
- **Gestão de Produtos** com funcionalidades de CRUD (Create, Read, Update, Delete).
- **Carrinho de Compras Dinâmico** com suporte a adição e remoção de produtos.
- **Processamento de Pagamentos** via Stripe.
- **Interface Responsiva** para uma boa experiência em dispositivos móveis.

## 🚀 Technology Stack

### 🌈 Frontend

#### ⚡ Core Frameworks
- [**Vite**](https://vitejs.dev/) - Ferramenta de build ultra-rápida.
- [**React**](https://react.dev/) - Biblioteca de interface baseada em componentes.
- [**React Router**](https://reactrouter.com/) - Sistema de navegação para páginas dentro do React.
- [**Chart.js**](https://www.chartjs.org/) - Biblioteca para criação de gráficos flexíveis.
- [**react-chartjs-2**](https://www.npmjs.com/package/react-chartjs-2) - Wrapper do React para o Chart.js.

#### 🎨 Estilização e Assets
- [**Tailwind CSS**](https://tailwindcss.com/) - CSS utilitário-first para um design customizável.
- [**RemixIcon**](https://remixicon.com/) - Ícones bonitos e modernos.

#### 🧠 Gerenciamento de Estado
- [**Redux Toolkit**](https://redux-toolkit.js.org/) - Ferramenta para gerenciamento de estado de forma eficiente.

---

### 🛠️ Backend

#### 🏗️ Servidor e Banco de Dados
- [**Express**](https://expressjs.com/) - Framework minimalista e flexível para construção de APIs.
- [**MongoDB**](https://www.mongodb.com/) - Banco de dados NoSQL para armazenar dados de produtos, usuários, pedidos, etc.
- [**Mongoose**](https://mongoosejs.com/) - ODM (Object Data Modeling) para facilitar a interação com MongoDB.

#### 🔌 Middleware
- [**CORS**](https://www.npmjs.com/package/cors) - Middleware para gerenciar o compartilhamento de recursos entre diferentes origens.
- [**Cookie Parser**](https://www.npmjs.com/package/cookie-parser) - Middleware para parseamento de cookies.
- [**Body Parser**](https://www.npmjs.com/package/body-parser) - Middleware para parseamento de corpos de requisições HTTP.

#### 🔒 Segurança
- [**Bcrypt**](https://www.npmjs.com/package/bcrypt) - Utilizado para criptografar senhas dos usuários.
- [**JWT**](https://jwt.io/) - Tecnologia de token JWT para autenticação de usuários.

#### 💳 Pagamentos
- [**Stripe**](https://stripe.com/) - Plataforma para processar pagamentos online de forma segura.

#### ⚙️ Ferramentas de Desenvolvimento
- [**node env**](https://nodejs.org/pt/learn/command-line/how-to-read-environment-variables-from-nodejs) - Para carregar variáveis de ambiente.
- [**Nodemon**](https://nodemon.io/) - Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.

---

## ⚡ Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/virgiliocesar/ecomerce-fashion.git
cd ecomerce-fashion
```

### 2. Instalar as Dependências
#### Frontend

```bash
cd frontend
npm install
```
#### Backend

```bash
cd backend
npm install
```

### 3. Configurar as Variáveis de Ambiente
#### Frontend

criar e configurar arquivo frontend/.env.local
```bash
VITE_STRIPE_PK=
VITE_NODE_ENV="development"
```
alterar arquivo frontend/src/utils/baseURL.js para *const baseUrl = "http://localhost:5000"*

#### Backend

criar e configurar arquivo backend/.env.local
```bash
MONGO_DB=
PORT= 5000
JWT_SECRET_KEY=
STRIPE_SECRET_KEY=

CLOUDINARY_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
Nota: Não se esquecer de configurar MONGO_DB, PORT, JWT_SECRET_KEY, STRIPE_SECRET_KEY, CLOUDINARY_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET acima.
```
alterar arquivo backend/src/utils/baseURL.js para *const baseUrl = "http://localhost:3000"*

### 4. Executar o Projeto
#### Backend

```bash
cd backend
npm run start:dev
```
#### Frontend

```bash
cd frontend
npm run start:dev
```
### 5. Acesse o Projeto
O projeto estará disponível em http://localhost:3000 para o front-end e http://localhost:5000 para o back-end.

###  Licença
Este projeto está licenciado sob a [MIT License](./LICENCE).
