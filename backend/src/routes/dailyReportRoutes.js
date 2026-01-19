const express = require('express')

const Router = express.Router()

const { createCashRegisterController, updatedDailyReportController, deleteDailyReportController, getDailyReportController, getAllDailyReportController } = require('../controllers/dailyReportController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /daily-report/{id}:
 *   get:
 *     summary: Buscar Registros de Caixa por ID
 *     tags: [DailyReports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caixa encontrado
 *       404:
 *         description: Caixa não encontrado
 */
Router.get('/:id', authMiddleware, getDailyReportController)
/**
 * @swagger
 * /daily-report:
 *   get:
 *     summary: Listar todos os caixas registrados
 *     tags: [DailyReports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de caixas registrados
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

Router.get('/', authMiddleware, getAllDailyReportController)

/**
 * @swagger
 * /daily-report:
 *   post:
 *     summary: Criar registro de caixa
 *     tags: [DailyReports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - initialCash
 *               - finalCash
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-19
 *               initialCash:
 *                 type: number
 *                 example: 500
 *               finalCash:
 *                 type: number
 *                 example: 750
 *               expensesData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - description
 *                     - amount
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: Compra de materiais
 *                     amount:
 *                       type: number
 *                       example: 50
 *     responses:
 *       201:
 *         description: Registro de caixa criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
Router.post('/', authMiddleware, createCashRegisterController)

/**
 * @swagger
 * /daily-report/{id}:
 *   patch:
 *     summary: Atualizar parcialmente um caixa registrado
 *     tags: [DailyReports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - initialCash
 *               - finalCash
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-19
 *               initialCash:
 *                 type: number
 *                 example: 500
 *               finalCash:
 *                 type: number
 *                 example: 750
 *               expensesData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - description
 *                     - amount
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: Compra de materiais
 *                     amount:
 *                       type: number
 *                       example: 50
 *     responses:
 *       200:
 *         description: Caixa atualizado
 *       400:
 *         description: Dados inválidos
 */
Router.patch('/:id', authMiddleware, updatedDailyReportController)
/**
 * @swagger
 * /daily-report/{id}:
 *   delete:
 *     summary: Deletar um caixa diário
 *     tags: [DailyReports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caixa
 *     responses:
 *       200:
 *         description: Caixa deletado com sucesso
 *       400:
 *         description: Caixa inexistente
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
Router.delete('/:id', authMiddleware, deleteDailyReportController)

module.exports = Router