const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getExpenseController } = require('../controllers/expenseController')

const Router = express.Router()

/**
 * @swagger
 * /expense:
 *   get:
 *     summary: Listar todos as despesas do usuário
 *     tags: [Despesas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de despesas registrados
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
Router.get('/:id', authMiddleware, getExpenseController)

module.exports = Router