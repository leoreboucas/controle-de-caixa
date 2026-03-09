# Backend — Daily Report Flow

API REST para o sistema de controle de caixa. Gerencia autenticação de usuários, produtos, registros diários de caixa e despesas, com regras de negócio aplicadas na camada de serviço.

---

## 🛠️ Tecnologias

- **Node.js** + **Express** — servidor e roteamento
- **MongoDB** + **Mongoose** — banco de dados e modelagem
- **Firebase Admin SDK** — verificação de tokens JWT emitidos pelo Firebase Authentication
- **Zod** — validação de dados de entrada
- **Jest** — testes unitários dos services
- **Swagger** — documentação interativa da API (`/api-docs`)

---

## 📁 Estrutura

```
src/
├── controllers/   # Recebem a requisição HTTP e delegam para os services
├── services/      # Lógica de negócio e interação com o banco de dados
│   └── tests/     # Testes unitários com Jest
├── models/        # Schemas Mongoose (User, Product, DailyReport, Expense)
├── routes/        # Definição das rotas da API
├── middlewares/   # Autenticação (Firebase) e autorização (admin)
├── schemas/       # Validação de entrada com Zod
├── helpers/       # Funções utilitárias (ex: normalização de datas UTC)
├── database/      # Conexão com o MongoDB
└── config/        # Configuração do Swagger
```

---

## ⚙️ Configuração

### 1. Clone e instale

```bash
cd controle-de-caixa/backend
npm install
```

### 2. Variáveis de ambiente

Crie o arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `PORT` | Porta do servidor (padrão: `3000`) |
| `MONGO_URI` | URI de conexão do MongoDB Atlas |
| `FIREBASE_PROJECT_ID` | ID do projeto no Firebase Console |
| *(demais)* | Credenciais do Firebase (ver `.env.example`) |

### 3. Firebase Admin SDK

O backend usa o Firebase Admin SDK para verificar os tokens de autenticação enviados pelo frontend.

1. No [Firebase Console](https://console.firebase.google.com/), acesse **Configurações do projeto → Contas de serviço**
2. Clique em **Gerar nova chave privada** — isso baixa um arquivo `.json`
3. Renomeie o arquivo para `private_key.json` e coloque na raiz do diretório `backend/`
4. ⚠️ **Nunca commite esse arquivo** — ele já está no `.gitignore`

### 4. Inicie o servidor

```bash
npm run dev
# Servidor em http://localhost:3000
# Documentação Swagger em http://localhost:3000/api-docs
```

---

## 🧪 Testes

```bash
npm test
```

Os testes cobrem os services de `DailyReport`, `Expense` e `Product` com mocks do Mongoose via Jest.

---

## 🔌 Endpoints

Todos os endpoints exigem autenticação via `Bearer token` no header `Authorization`.

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/products` | Listar todos os produtos |
| `GET` | `/products/:id` | Buscar produto por ID |
| `POST` | `/products` | Criar produto |
| `PATCH` | `/products/:id` | Atualizar produto |
| `DELETE` | `/products/:id` | Deletar produto |

### Caixa Diário

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/daily-report` | Listar todos os caixas |
| `GET` | `/daily-report/:id` | Buscar caixa por ID |
| `POST` | `/daily-report` | Registrar caixa do dia |
| `PATCH` | `/daily-report/:id` | Atualizar caixa |
| `DELETE` | `/daily-report/:id` | Deletar caixa |
| `GET` | `/expense/:id` | Listar despesas de um caixa |

> A documentação completa e interativa está disponível em `/api-docs` com o servidor rodando.

---

## 📝 Licença

MIT — veja o arquivo [LICENSE](../LICENSE).
