// Carregando módulos
const express = require('express')
require('dotenv').config()
require('./database/index')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')
const cors = require('cors')

// Aplicação
const app = express()

// Cors 

const allowedOrigins = [
    "http://localhost:5173",
    "https://dailyreportflow.onrender.com",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Import das routes

const user = require('./routes/userRoutes')
const product = require('./routes/productRoutes')
const dailyReport = require('./routes/dailyReportRoutes')
const expense = require('./routes/expenseRoute')

// Configurações
    // Documentação com Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    
    // Sessão 

    // Body Parser 
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))


// Rotas

app.use('/user', user)
app.use('/products', product)
app.use('/daily-report/expense', expense)
app.use('/daily-report', dailyReport)


// Inicialização

const PORT = process.env.PORT || PORT

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})  