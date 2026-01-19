# controle-de-caixa

## Autenticação (para testes)

Este projeto utiliza Firebase Authentication.
Para testar os endpoints protegidos via Swagger:

1. Crie um usuário no Firebase Auth
2. Gere um ID Token no frontend ou via Firebase CLI
3. No Swagger, clique em "Authorize"
4. Insira:
   Bearer <SEU_TOKEN_AQUI>