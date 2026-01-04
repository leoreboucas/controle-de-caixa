const {
    createProductService,
    updateProductService
} = require('../services/productService')

const {
    createProductSchema,
    updateProductSchema
} = require('../schemas/product.schema')
const User = require('../models/User')

const createProductController = async (req, res) => {
    try {
            const data = createProductSchema.parse(req.body)
            const product = await createProductService({
                ...data,
                user: req.user
            })

            res.status(201).json(product)
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
}

const updatedProductController = async (req, res) => {
    try {
        const productID = req.params.id
        const data = updateProductSchema.parse(req.body)
        const product = await updateProductService({
            ...data,
            productID,
            user: req.user
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createProductController,
    updatedProductController
}