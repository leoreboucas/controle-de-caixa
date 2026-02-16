const Product = require('../models/Product')
const User = require('../models/User')

const getProductService = async ({ productID, user } ) => {
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }

    const userId = userExists._id

    const product = await Product.findOne({
        userId,
        _id: productID
    })

    if(!product) {
        throw new Error('Produto não existe!')
    }

    return product
}

const getAllProductService = async ({ user }) => {
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }

    const userId = userExists._id

    const product = await Product.find({
        userId
    })
    

    return product
}

const createProductService = async({user, ...product})  => {
    const { name, purchasePrice, salePrice } = product
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }

    const userId = userExists._id 

    if(salePrice < purchasePrice) {
        throw new Error('Valor de venda deve ser maior ou igual ao de compra.')
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

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }

    const userId = userExists._id

    if (salePrice < purchasePrice) {
        throw new Error('Valor de venda deve ser maior ou igual ao de compra.')
    }
    
    const existingProduct = await Product.findOne({
        userId,
        name: new RegExp(`^${name}$`, 'i')
    })

    if (existingProduct && existingProduct._id.toString() !== productID) {
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

const deleteProductService = async({productID, user}) =>  {
    const firebaseUid = user.uid

    const userExists = await User.findOne({ firebaseUid })
    if (!userExists) {
        throw new Error('Usuário não encontrado.')
    }

    const userId = userExists._id

    const productExists = await Product.findOne({ 
        userId,
        _id: productID
     })

    if(!productExists){
        throw new Error('Produto inexistente!')
    }

    const product = await Product.findOneAndDelete({ 
        userId,
        _id: productID
    })
    
    return product
}

module.exports = {
    getProductService,
    getAllProductService,
    createProductService,
    updateProductService,
    deleteProductService
}