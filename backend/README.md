## Controle de Caixa - Backend

Este é o backend para o sistema de controle de caixa, desenvolvido com Node.js e Express. Ele fornece uma API RESTful para gerenciar produtos, vendas e relatórios financeiros.

## Para que serve
Sistema de controle de caixa diário para pequenos negócios, permitindo registrar produtos, vendas e acompanhar o fluxo financeiro de forma organizada.

### Funcionalidades
- Gerenciamento de produtos (CRUD).
- Registro de vendas.
- Geração de relatórios financeiros.
- Autenticação e autorização de usuários.

### Tecnologias Utilizadas
- Node.js
- Express
- MongoDB 
- Mongoose
- JWT para autenticação
- Firebase Admin SDK para integração com Firebase Authentication
- dotenv para gerenciamento de variáveis de ambiente

### Estrutura do Projeto
- `src/controllers`: Orquestradores das requisições HTTP e chamadas aos serviços.
- `src/models`: Modelos Mongoose para produtos, vendas e usuários.
- `src/routes`: Definição das rotas da API.
- `src/middleware`: Middleware para autenticação e tratamento de erros.
- `src/utils`: Funções utilitárias e helpers.
- `src/config`: Configurações do banco de dados e outras configurações da aplicação.
- `src/services`: Serviços para interações com o banco de dados e outras operações e lógica de negócio.
- `src/database`: Scripts de inicialização e configuração do banco de dados.
- `src/schemas`: Definições de esquemas para validação de dados.


### Como Rodar o Projeto
1. Clone o repositório:
   ```bash
   git clone <repository-url>
   ```
2. Navegue até o diretório do backend:
   ```bash
    cd controle-de-caixa/backend
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure as variáveis de ambiente criando um arquivo `.env` baseado no arquivo `.env.example`.

5. Inicie o servidor:
    ```bash
    npm run dev
    ```

6. O servidor estará rodando em `http://localhost:3000`.

7. Configure o Firebase Admin SDK seguindo as instruções na [documentação oficial](https://firebase.google.com/docs/admin/setup).
8. Gere a private_key.json e coloque na raiz do projeto backend(lembre-se de não commitar o arquivo private_key.json no repositório).
9. Adicione as variáveis de ambiente do Firebase no arquivo .env conforme o exemplo fornecido.

### API Endpoints
- `POST /products`: Criar um novo produto.
- `GET /products`: Listar todos os produtos.
- `PATCH /products/:id`: Atualizar um produto.
- `DELETE /products/:id`: Deletar um produto.
- `POST /daily-report`: Registrar um novo caixa diário.
- `GET /daily-report`: Obter os caixas diários registrados.
- `GET /daily-report/:id`: Obter detalhes de um caixa diário específico.
- `PATCH /daily-report/:id`: Atualizar um caixa diário.
- `DELETE /daily-report/:id`: Deletar um caixa diário.
- `GET /daily-report/expense/:id`: Obter despesas de um caixa diário específico.


### Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

### Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.