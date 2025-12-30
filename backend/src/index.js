// Carregando módulos
const express = require('express')
require('dotenv').config()
require('./database/index')

// Aplicação
const app = express()

// Import das routes

const product = require('./routes/productRoutes')
const dailyReport = require('./routes/dailyReportRoutes')

// Configurações
    // Sessão 

    // Middlewares

    // Body Parser 
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))

// Rotas

app.use('/product', product)
app.use('/daily-report', dailyReport)

// Inicialização

const PORT = process.env.PORT || PORT

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})