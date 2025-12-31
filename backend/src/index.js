// Carregando módulos
const express = require('express')
require('dotenv').config()
require('./database/index')

// Aplicação
const app = express()

// Import das routes

const product = require('./routes/productRoutes')
const dailyReport = require('./routes/dailyReportRoutes')
// const user = require('./routes/')

// Configurações
    // Sessão 

    // Middlewares

    // Body Parser 
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))

// Rotas

app.use('/products', product)
app.use('/daily-report', dailyReport)

// Inicialização

const PORT = process.env.PORT || PORT

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})