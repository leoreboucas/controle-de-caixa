const { z } = require('zod')

const createProductSchema = z.object({
    name: z.string().trim().min(1, 'Nome é obrigatório'),
    purchasePrice: z.number().positive('Preço de compra deve ser positivo'),
    salePrice: z.number().positive('Preço de venda deve ser positivo'),
})

module.exports = {
    createProductSchema
}