## Controle de Caixa - Frontend

Este repositório contém o **frontend** do sistema de Controle de Caixa, desenvolvido com **React**.  
A aplicação consome uma API backend para gerenciar **caixa diário, produtos, despesas e relatórios financeiros**, com autenticação via Firebase.

### Funcionalidades
- Autenticação de usuários utilizando **Firebase Authentication**
- Cadastro e visualização de produtos
- Registro de caixa diário (caixa inicial, caixa final e despesas)
- Listagem de caixas organizados por data
- Navegação entre páginas com React Router
- Interface responsiva e consistente com Tailwind CSS

### Tecnologias Utilizadas
- React
- Vite
- Firebase Authentication
- React Router DOM
- Tailwind CSS
- React Firebase Hooks
- Axios

### Estrutura do Projeto
- `src/components`: Componentes reutilizáveis da aplicação, como Header, NavBar, InfoItem, ProductInfo e ResumeItem.
- `src/services`: Configurações e serviços, incluindo a configuração do Firebase.
- `src/pages`: Páginas principais da aplicação, como Dashboard, Products, Sales e Reports.
- `src/routes`: Configuração das rotas da aplicação utilizando React Router.
- `src/hooks`: Hooks personalizados para funcionalidades específicas, como autenticação.
- `src/utils`: Funções utilitárias e helpers.

### Como Rodar o Projeto
1. Clone o repositório:
   ```bash
   git clone <repository-url>
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd controle-de-caixa/frontend
     ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5. Acesse a aplicação em `http://localhost:5173/`.

### Configuração do Firebase

Crie um projeto no [Firebase Console](https://console.firebase.google.com/) e ative o **Firebase Authentication** com o provedor de e-mail/senha e provedor Google.

Crie um arquivo src/services/firebase.js com a seguinte configuração, substituindo os valores pelas credenciais do seu projeto Firebase:

```javascript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    const firebaseConfig =
    {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID",
    measurementId: "SEU_MEASUREMENT_ID"
    };
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
```
O Firebase é utilizado exclusivamente para autenticação, enquanto os dados da aplicação são gerenciados pelo backend.

### Integração com o Backend
Este frontend consome uma API backend para gerenciar os dados do sistema de controle de caixa.
- Caixa diário
- Produtos
- Despesas
- Relatórios financeiros

Certifique-se de que o backend esteja rodando e acessível para que o frontend funcione corretamente.
### Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull
requests para melhorias e correções.

### Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.