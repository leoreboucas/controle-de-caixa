// Carregando módulos
const express = require('express')
require('dotenv').config()
require('./database/index')

// Aplicação
const app = express()

// Import das routes

const product = require('./routes/productRoutes')
const dailyReport = require('./routes/dailyReportRoutes')
const DailyReport = require('./models/DailyReport')
const authMiddleware = require('./middlewares/authMiddleware')
const Product = require('./models/Product')

// Configurações
    // Sessão 

    // Middlewares

    // Body Parser 
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))

// Rotas

app.get('/daily-report/get', authMiddleware, async (req, res) => {
    const dailyregistered = await Product.find()
    console.log(dailyregistered)
    res.status(200).json({ message: 'Bem feito'})
})
app.use('/products', product)
app.use('/daily-report', dailyReport)

// Inicialização

const PORT = process.env.PORT || PORT

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})