const {
    createProductService,
    updateProductService,
    deleteProductService,
    getProductService,
    getAllProductService
} = require('../services/productService')

const {
    createProductSchema,
    updateProductSchema
} = require('../schemas/product.schema')

const getProductController = async (req, res) => {
    try {
        const productID = req.params.id
        const product = await getProductService({
            productID,
            user: req.user
        })

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllProductController = async (req, res) => {
    try {
        const product = await getAllProductService({
            user: req.user
        })

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

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

const deleteProductController = async (req, res) => {
    try {
        const productID = req.params.id
        const product = await deleteProductService({
            productID,
            user: req.user
        })

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    getProductController,
    getAllProductController,
    createProductController,
    updatedProductController,
    deleteProductController
}