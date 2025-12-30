const {
    createProductService
} = require('../services/productService')

const {
    createProductSchema
} = require('../schemas/product.schema')

const createProductController = async (req, res) => {
    try {
            const data = createProductSchema.parse(req.body)
            const product = await createProductService({
                ...req.body,
                user: data
            })
            res.status(201).json(product)
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
}

module.exports = {
    createProductController
}