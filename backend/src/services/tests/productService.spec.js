const Product = require('../../models/Product')
const User = require('../../models/User')
const { getProductService, getAllProductService, createProductService, updateProductService, deleteProductService } = require('../productService')

jest.mock('../../models/User', () => ({
    findOne: jest.fn(),
}))

jest.mock('../../models/Product', () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
}))

const mockUser = () => ({
    _id: 'user-id',
    firebaseUid: 'firebase-uid',
    email: 'usertest@test.com',
})

describe("getProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            getProductService({
                user: { uid: 'firebase-uid' },
                productID: 'product-id'
            })
        ).rejects.toThrow('Usuário não encontrado.')

        expect(User.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                firebaseUid: "firebase-uid"
            })
        )
    })

    it('deve lançar erro se o produto não exister', async () => {
        User.findOne.mockResolvedValue(mockUser())

        Product.findOne.mockResolvedValue(null)

        await expect(getProductService({
            user: { uid: 'firebase-uid' },
            productID: 'product-id'
        })).rejects.toThrow('Produto não existe!')

        expect(User.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                firebaseUid: "firebase-uid"
            })
        )

        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                _id: 'product-id'
            })
        )
    })


    it('sucesso ao retornar um produto', async () => {
        User.findOne.mockResolvedValue(mockUser())

        Product.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'product-id'
        })

        await expect(getProductService({
            user: { uid: 'firebase-uid' },
            productID: 'product-id'
        })).resolves.toEqual({
            _id: 'product-id',
            userId: 'user-id'
        })

        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(Product.findOne).toHaveBeenCalledTimes(1)

        expect(User.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                firebaseUid: "firebase-uid"
            })
        )

        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                _id: 'product-id'
            })
        )
    })
})

describe("getAllProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            getAllProductService({
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
    })

    it('sucesso ao retornar os produtos', async () => {
        User.findOne.mockResolvedValue(mockUser())

        Product.find.mockResolvedValue([{
            _id: 'product-id',
            userId: 'user-id'
        }])

        await expect(getAllProductService({
            user: { uid: 'firebase-uid' }
        })).resolves.toEqual([{
            _id: 'product-id',
            userId: 'user-id'
        }])

        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(Product.find).toHaveBeenCalledTimes(1)

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })

        expect(Product.find).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id'
            })
        )
    })
})

describe("createProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            createProductService({
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
    })

    it('deve lançar erro se o valor de venda for menor que o de compra', async () => {
        User.findOne.mockResolvedValue(mockUser())

        const salePrice = 10
        const purchasePrice = 20

        await expect(createProductService({
            user: { uid: 'firebase-uid' },
            salePrice,
            purchasePrice
        })).rejects.toThrow('Valor de venda deve ser maior ou igual ao de compra.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
    })

    it('deve lançar erro caso já exista um produto com o nome enviado', async () => {
        User.findOne.mockResolvedValue(mockUser())

        const salePrice = 20
        const purchasePrice = 10
        const name = 'product-test'

        Product.findOne.mockResolvedValue({
            userId: 'user-id',
            name
        })

        await expect(createProductService({
            user: { uid: 'firebase-uid' },
            salePrice,
            purchasePrice,
            name
        })).rejects.toThrow('Já existe um produto com esse nome.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                name: new RegExp(`^${name}$`, 'i')
            })
        )
    })

    it('sucesso ao criar produto', async () => {
        User.findOne.mockResolvedValue(mockUser())

        const salePrice = 20
        const purchasePrice = 10
        const name = 'product-test'

        Product.findOne.mockResolvedValue(null)

        Product.create.mockResolvedValue({
            userId: 'user-id',
            name,
            purchasePrice,
            salePrice
        })

        await expect(createProductService({
            user: { uid: 'firebase-uid' },
            salePrice,
            purchasePrice,
            name
        })).resolves.toEqual({
            userId: 'user-id',
            name,
            purchasePrice,
            salePrice
        })

        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(Product.findOne).toHaveBeenCalledTimes(1)
        expect(Product.create).toHaveBeenCalledTimes(1)

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                name: new RegExp(`^${name}$`, 'i')
            })
        )
        expect(Product.create).toHaveBeenCalledWith({
            userId: 'user-id',
            name,
            purchasePrice,
            salePrice
        })
    })
})

describe("updateProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            updateProductService({
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
    })

    it('deve lançar erro se o valor de venda for menor que o de compra', async () => {
        User.findOne.mockResolvedValue(mockUser())

        const salePrice = 10
        const purchasePrice = 20

        await expect(updateProductService({
            user: { uid: 'firebase-uid' },
            salePrice,
            purchasePrice
        })).rejects.toThrow('Valor de venda deve ser maior ou igual ao de compra.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
    })

    it('deve lançar erro caso já exista um produto com o nome enviado que não seja o que vai ser alterado', async () => {
        User.findOne.mockResolvedValue(mockUser())

        const salePrice = 20
        const purchasePrice = 10
        const name = 'product-test'

        Product.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'other-product-id',
            name
        })

        await expect(updateProductService({
            productID: 'product-id',
            user: { uid: 'firebase-uid' },
            salePrice,
            purchasePrice,
            name,
        })).rejects.toThrow('Já existe um produto com esse nome.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                name: new RegExp(`^${name}$`, 'i')
            })
        )
    })

    it("deve lançar erro caso o produto para alterar não exista", async () => {
        User.findOne.mockResolvedValue(mockUser())

        const salePrice = 20
        const purchasePrice = 10
        const name = 'product-test'

        Product.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'product-id',
            name
        })

        Product.findOneAndUpdate.mockResolvedValue(null)

        await expect(updateProductService({
            productID: 'product-id',
            user: { uid: 'firebase-uid' },
            salePrice,
            purchasePrice,
            name
        })).rejects.toThrow("Produto inexistente!")

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                name: new RegExp(`^${name}$`, 'i')
            })
        )

        expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
            expect.objectContaining({_id: 'product-id', userId: 'user-id'}),
            expect.objectContaining({
                name, purchasePrice, salePrice
            }),
            { new: true}
        )
    })

    it('sucesso ao alterar produto', async () => {
        User.findOne.mockResolvedValue(mockUser())

        const salePrice = 20
        const purchasePrice = 10
        const name = 'product-alter-test'

        Product.findOne.mockResolvedValue(null)

        Product.findOneAndUpdate.mockResolvedValue({
            userId: 'user-id',
            _id: 'product-id',
            name,
            purchasePrice,
            salePrice
        })

        await expect(updateProductService({
            productID: 'product-id',
            user: { uid: 'firebase-uid' },
            salePrice,
            purchasePrice,
            name
        })).resolves.toEqual({
            userId: 'user-id',
            name,
            _id: 'product-id',
            purchasePrice,
            salePrice
        })

        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(Product.findOne).toHaveBeenCalledTimes(1)
        expect(Product.findOneAndUpdate).toHaveBeenCalledTimes(1)

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                name: new RegExp(`^${name}$`, 'i')
            })
        )
        expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
            expect.objectContaining({ _id: 'product-id', userId: 'user-id' }),
            expect.objectContaining({
                name, purchasePrice, salePrice
            }),
            { new: true }
        )
    })
})

describe("deleteProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            deleteProductService({
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
    })

    it('deve lançar erro caso o produto que deseja apagar não exista no banco de dados', async () => {
        User.findOne.mockResolvedValue(mockUser())

        Product.findOne.mockResolvedValue(null)

        await expect(deleteProductService({
            productID: 'product-id',
            user: { uid: 'firebase-uid' }
        })).rejects.toThrow("Produto inexistente!")

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                _id: 'product-id'
            })
        )
    })

    it("sucesso ao deletar produto", async () => {
        User.findOne.mockResolvedValue(mockUser())

        Product.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'product-id'
        })

        Product.findOneAndDelete.mockResolvedValue({
            userId: 'user-id',
            _id: 'product-id'
        })

        await expect(deleteProductService({
            productID: 'product-id',
            user: { uid: 'firebase-uid' }
        })).resolves.toEqual({
            userId: 'user-id',
            _id: 'product-id'
        })

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: "firebase-uid"
        })
        expect(Product.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                _id: 'product-id'
            })
        )
    })
})