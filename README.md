# Controle de Caixa API

API REST para controle de produtos, fluxo de caixa diário e despesas,  
com autenticação via Firebase e arquitetura em camadas.

---

## 🔐 Autenticação (para testes)

Este projeto utiliza **Firebase Authentication**.

Para testar os endpoints protegidos via **Swagger**:

1. Crie um usuário no **Firebase Authentication**
2. Gere um **ID Token** (via frontend ou Firebase CLI)
3. Acesse o Swagger
4. Clique em **Authorize**
5. Insira no campo:
   Bearer <SEU_TOKEN_AQUI>

## 🏗️ Arquitetura do Projeto

O projeto segue uma **arquitetura em camadas**, separando responsabilidades:

- **Controllers**: recebem e respondem requisições HTTP
- **Services**: concentram regras de negócio
- **Models**: schemas do MongoDB (Mongoose)
- **Middlewares**: autenticação e autorização
- **Schemas**: validação de dados com Zod

---

## 🚀 Como rodar o projeto localmente

### Passo a passo:

1. Clone o repositório:
```bash
    git clone <url-do-repositorio>
```
2. Instale as dependências:
```bash
   npm install
``` 
3. Crie um arquivo .env com as variáveis necessárias
4. Inicie o banco de dados Mongo
5. Inicie o servidor:
   npm run dev

Arquivo .env com os dados necessários:

```env
PORT=3000
MONGO_URI=

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
```

📄 Documentação da API

A documentação da API está disponível em:

http://localhost:3000/api-docs

Por meio do Swagger é possível:

Visualizar todas as rotas disponíveis

Testar requisições autenticadas

Analisar os schemas de entrada e saída
