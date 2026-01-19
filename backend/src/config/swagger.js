const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Controle de Caixa API',
        version: '1.0.0',
        description: 'Documentação da API do Controle de Caixa',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'], // onde estão suas rotas
}

module.exports = swaggerJSDoc(options)
