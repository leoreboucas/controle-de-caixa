const { z } = require('zod')

const createProductSchema = z.object({
    name: z.string().trim().min(1, 'Nome é obrigatório'),
    purchasePrice: z.number().positive('Preço de compra deve ser positivo'),
    salePrice: z.number().positive('Preço de venda deve ser positivo'),
})

const updateProductSchema = z.object({
    name: z.string().trim().min(1, 'Nome é obrigatório'),
    purchasePrice: z.number().nonnegative('Preço de compra deve ser igual ou maior que R$ 0,00'),
    salePrice: z.number().nonnegative('Preço de venda deve ser maior ou igual a R$ 0,00'),
})

module.exports = {
    createProductSchema,
    updateProductSchema
}