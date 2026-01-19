const express = require('express')

const Router = express.Router()

const { createProductController, updatedProductController, deleteProductController, getAllProductController, getProductController } = require('../controllers/productController') 
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Products]
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
 *         description: Produto encontrada
 *       404:
 *         description: Produto não encontrada
 */

Router.get('/:id', authMiddleware, getProductController)

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
Router.get('/', authMiddleware, getAllProductController)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - purchasePrice
 *             properties:
 *               name:
 *                 type: string
 *               purchasePrice:
 *                 type: number
 *               salePrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
Router.post('/', authMiddleware, createProductController)

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Atualizar parcialmente uma tarefa
 *     tags: [Products]
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
 *             properties:
 *               name:
 *                 type: string
 *               purchasePrice:
 *                 type: number
 *               salePrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       400:
 *         description: Dados inválidos
 */
Router.patch('/:id', authMiddleware, updatedProductController)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletar um produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       400:
 *         description: Produto inexistente
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
Router.delete('/:id', authMiddleware, deleteProductController)

// 696e157e9091f46af421b90d

module.exports = Router