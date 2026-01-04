const Product = require('../models/Product')
const User = require('../models/User')

const createProductService = async({user, ...product})  => {
    const { name, purchasePrice, salePrice } = product
    const firebaseUid = user.uid

    const userId = (await User.findOne({ firebaseUid }))._id 

    if(salePrice < purchasePrice) {
        throw new Error('Valor de venda deve ser maior que o de compra.')
    }

    const existingProduct = await Product.findOne({
        userId,
        name: new RegExp(`^${name}$`, 'i')
    })

    if (existingProduct) {
        throw new Error('Já existe um produto com esse nome.')
    }

    const newProduct = await Product.create({
        userId,
        name,
        purchasePrice,
        salePrice
    })

    return newProduct
}

const updateProductService = async({productID, user, ...product}) => {
    const { name, purchasePrice, salePrice } = product
    const firebaseUid = user.uid

    const userId = (await User.findOne({ firebaseUid }))._id

    if(!userId) {
        throw new Error('Usuário não encontrado.')
    }

    if (salePrice <= purchasePrice) {
        throw new Error('Valor de venda deve ser maior ou igual ao de compra.')
    }

    const existingProduct = await Product.findOne({
        userId,
        name: new RegExp(`^${name}$`, 'i')
    })

    if (existingProduct._id.toString() !== productID) {
        throw new Error('Já existe um produto com esse nome.')
    }

    const updatedProduct = await Product.findOneAndUpdate(
        { _id: productID, userId },
        {
            name,
            purchasePrice,
            salePrice
        },
        { new: true }
    )

    if(!updatedProduct){
        throw new Error('Produto inexistente!')
    }

    return updatedProduct
}

module.exports = {
    createProductService,
    updateProductService
}