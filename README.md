# 📊 Daily Report Flow — Sistema de Controle de Caixa

Aplicação web full stack para gestão financeira de pequenos negócios. Permite registrar o caixa diário, acompanhar despesas, gerenciar produtos e visualizar relatórios mensais consolidados.

**🔗 [Acesse a aplicação](https://dailyreportflow.netlify.app)**

---

## ✨ Funcionalidades

- **Autenticação** com e-mail/senha e login com Google via Firebase
- **Registro de caixa diário** com caixa inicial, caixa final e despesas vinculadas
- **Relatório mensal** com receita bruta, despesas totais e receita líquida
- **Gestão de produtos** com preço de custo, preço de venda e margem de lucro
- **Filtro por mês** nos relatórios e histórico de caixas
- **Rotas protegidas** — acesso restrito a usuários autenticados
- **Interface responsiva** para desktop e mobile

---

## 🖥️ Preview

> Dashboard com resumo financeiro mensal

![Dashboard](https://dailyreportflow.netlify.app/favicon.jpg)

---

## 🗂️ Estrutura do Repositório

```
controle-de-caixa/
├── backend/    # API REST com Node.js, Express e MongoDB
└── frontend/   # Interface React com Tailwind CSS
```

---

## 🚀 Rodando o projeto localmente

### Pré-requisitos

- Node.js 18+
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (ou instância local)
- Projeto no [Firebase Console](https://console.firebase.google.com/) com Authentication ativado

### Backend

```bash
cd controle-de-caixa/backend
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis com suas credenciais (ver [backend/README.md](backend/README.md)).

```bash
npm run dev
# Servidor rodando em http://localhost:3000
```

### Frontend

```bash
cd controle-de-caixa/frontend
npm install
npm run dev
# Aplicação em http://localhost:5173
```

---

## 🛠️ Stack

| Camada | Tecnologias |
|---|---|
| Backend | Node.js, Express, MongoDB, Mongoose, Firebase Admin SDK, Zod, Jest, Swagger |
| Frontend | React, Vite, Tailwind CSS, Firebase Auth, React Router, Axios |
| Infra | Netlify (frontend), MongoDB Atlas |

---

## 📄 Documentação detalhada

- [Backend — README](backend/README.md)
- [Frontend — README](frontend/README.md)

---

## 📝 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
