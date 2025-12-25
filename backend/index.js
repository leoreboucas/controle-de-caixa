// Carregando módulos
const express = require('express')
require('dotenv').config()
require('./database/index')

// Aplicação
const app = express()

// Import das routes

// Configurações
    // Sessão

    // Middlewares

    // Body Parser 

    // Mongoose

// Rotas

// Inicialização

const PORT = process.env.PORT || PORT

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})