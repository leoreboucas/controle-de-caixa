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

module.exports = {
    createProductService
}