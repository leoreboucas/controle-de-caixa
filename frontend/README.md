# Frontend — Daily Report Flow

Interface web do sistema de controle de caixa. Consome a API do backend para gerenciar produtos, registros de caixa e relatórios financeiros mensais.

**🔗 [Acesse em produção](https://dailyreportflow.netlify.app)**

---

## 🛠️ Tecnologias

- **React** + **Vite** — interface e build
- **Tailwind CSS** — estilização com utilitários
- **React Router DOM** — navegação e rotas protegidas
- **Firebase Authentication** — autenticação com e-mail/senha e Google
- **Axios** — chamadas à API do backend
- **React Firebase Hooks** — gerenciamento de estado de autenticação

---

## 📁 Estrutura

```
src/
├── components/   # Componentes reutilizáveis (Header, NavBar, FormField, DashboardCard...)
├── pages/        # Páginas da aplicação (Dashboard, Products, DailyReport, Login, Signin...)
├── routes/       # PrivateRoute e NotFoundRedirect
├── services/     # Funções de chamada à API (products, dailyreport, expenses, firebase)
├── contexts/     # AuthContext com estado global de autenticação
├── hooks/        # useAuth — hook de autenticação
├── utils/        # inputBase (estilo padrão de inputs) e utilitários de filtro por mês
└── styles/       # CSS global com Tailwind
```

---

## ⚙️ Configuração

### 1. Clone e instale

```bash
cd controle-de-caixa/frontend
npm install
```

### 2. Configure o Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative o **Authentication** com os provedores **E-mail/Senha** e **Google**
3. Copie as credenciais do projeto em **Configurações → Configuração do SDK**
4. Atualize o arquivo `src/services/firebase.js` com suas credenciais:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};
```

> O Firebase é usado **apenas para autenticação**. Todos os dados da aplicação são gerenciados pelo backend.

### 3. Configure a URL da API

Por padrão o frontend aponta para `http://localhost:3000`. Para apontar para outro ambiente, crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=https://sua-api.com
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
# Aplicação em http://localhost:5173
```

---

## 📄 Páginas

| Rota | Descrição | Acesso |
|---|---|---|
| `/` | Landing page | Público |
| `/login` | Login com e-mail ou Google | Público |
| `/signin` | Criação de conta | Público |
| `/dashboard` | Resumo financeiro mensal | Privado |
| `/products` | Lista de produtos | Privado |
| `/products/new` | Cadastrar produto | Privado |
| `/products/edit/:id` | Editar produto | Privado |
| `/daily-report` | Histórico de caixas | Privado |
| `/daily-report/new` | Registrar caixa do dia | Privado |
| `/daily-report/edit/:id` | Editar caixa | Privado |

---

## 📝 Licença

MIT — veja o arquivo [LICENSE](../LICENSE).
