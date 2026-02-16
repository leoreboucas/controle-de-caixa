const User = require('../../models/User')
const DailyReport = require('../../models/DailyReport')
const { getCashRegisterService, getAllCashRegisterService, createCashRegisterService, updateCashRegisterService, deleteCashRegisterService } = require('../dailyReportService')
const Expense = require('../../models/Expense')


jest.mock('../../models/User', () => ({
    findOne: jest.fn(),
}))

jest.mock('../../models/DailyReport', () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
}))

jest.mock('../../models/Expense', () => ({
    insertMany: jest.fn(),
    deleteMany: jest.fn()
}))

const mockUser = () => ({
    _id: 'user-id',
    firebaseUid: 'firebase-uid',
    email: 'usertest@test.com',
})

describe('getCashRegisterService', () => {
    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            getCashRegisterService({
                dailyreportID: 'report-id',
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')
    })


    it('deve lançar erro se o caixa não existir', async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue(null)


        await expect(
            getCashRegisterService({
                dailyreportID: 'report-id',
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Caixa não existe!')
    })


    it('deve retornar o dailyReport se usuário e caixa existirem', async () => {
        // Aqui eu quero simular um findOne do usuario que retorna esses dados, nisso eu salvei em uma váriavel
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id'
        })
        const result = await getCashRegisterService({
            dailyreportID: 'report-id',
            user: { uid: 'firebase-uid' }
        })

        expect(DailyReport.findOne).toHaveBeenCalledWith({
            userId: 'user-id',
            _id: 'report-id'
        })

        expect(result).toEqual({
            userId: 'user-id',
            _id: 'report-id'
        })
    })
})
afterEach(() => {
    jest.clearAllMocks()
})
describe("getAllCashRegisterService", () => {
    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            getAllCashRegisterService({
                dailyreportID: 'report-id',
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')
    })

    it('deve retornar todos os dailyReports se usuário e caixas existirem', async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.find.mockResolvedValue([{
            userId: 'user-id',
            _id: 'report-id'
        }])
        const result = await getAllCashRegisterService({
            user: { uid: 'firebase-uid' }
        })

        expect(DailyReport.find).toHaveBeenCalledWith({
            userId: 'user-id'
        })
        expect(result).toEqual([{
            userId: 'user-id',
            _id: 'report-id'
        }])
    })
})
afterEach(() => {
    jest.clearAllMocks()
})
describe("createCashRegisterService", () => {
    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            createCashRegisterService({
                dailyreportID: 'report-id',
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')
    })

    it("testar se retorna erro ao colocar data futura", async() => {
        User.findOne.mockResolvedValue(mockUser())
        const date = new Date();
        date.setDate(date.getDate() + 1);

        await expect(createCashRegisterService({ 
            user: { uid: 'firebase-uid' }, 
            date
            }, 
        )).rejects.toThrow('Não é permitido criar caixa para datas futuras');
    })

    it("testar se retorna erro ao colocar uma data que já existe um dailyReport", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue({
                userId: 'user-id',
                _id: 'report-id'
            });
        
        const date = new Date();

        await expect(createCashRegisterService({
            user: { uid: 'firebase-uid' },
            date
        },
        )).rejects.toThrow('Já existe um caixa registrado para este dia');
    })

    it("testar se retorna erro caso a renda bruta seja negativa e não tenha tido despesas", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue(null);

        const date = new Date();
        const initialCash = 0
        const finalCash = -20

        await expect(createCashRegisterService({
            user: { uid: 'firebase-uid' },
            date,
            expensesData: [],
            initialCash,
            finalCash
        },
        )).rejects.toThrow('Lucro negativo sem despesas registradas');
    })

    it("testar se retorna erro caso as despesas sejam maiores que a renda disponível", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue(null);

        const date = new Date();
        const initialCash = 0
        const finalCash = 20
        const expensesData = [
            { amount: 30 }
        ]
        await expect(createCashRegisterService({
            user: { uid: 'firebase-uid' },
            date,
            expensesData,
            initialCash,
            finalCash
        },
        )).rejects.toThrow('Despesas incompatíveis com o caixa informado');
    })

    it("sucesso ao criar um caixa sem despesas", async () => {
        User.findOne.mockResolvedValue(mockUser())

        const date = new Date();
        const initialCash = 50;
        const finalCash = 300;
        const totalExpense = 0
        const grossProfit = (finalCash - initialCash) + totalExpense
        const netProfit = grossProfit - totalExpense

        DailyReport.create.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id',
            date,
            initialCash,
            finalCash,
            totalExpense,
            grossProfit,
            netProfit
        })

        await expect(createCashRegisterService({
            user: { uid: 'firebase-uid' },
            date,
            expensesData: [],
            initialCash,
            finalCash
        })).resolves.toEqual({ 
            _id: "report-id", 
            userId: "user-id",
            date, 
            finalCash, 
            grossProfit,
            initialCash,
            netProfit,
            totalExpense
        })
    })

    it("sucesso ao criar um caixa com despesas", async () => {
        User.findOne.mockResolvedValue(mockUser())

        const date = new Date();
        const initialCash = 50;
        const finalCash = 300;
        const expensesData = [{
            amount: 50
        }];
        const totalExpense = 50
        const grossProfit = (finalCash - initialCash) + totalExpense
        const netProfit = grossProfit - totalExpense

        DailyReport.create.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id',
            date,
            initialCash,
            finalCash,
            totalExpense,
            grossProfit,
            netProfit
        })

        Expense.insertMany.mockResolvedValue([{
            amount: 50,
            userId: 'user-id',
            dailyReportId: 'report-id'
        }])
        

        await expect(createCashRegisterService({
            user: { uid: 'firebase-uid' },
            date,
            expensesData,
            initialCash,
            finalCash
        })).resolves.toEqual({
            _id: "report-id",
            userId: "user-id",
            date,
            finalCash,
            grossProfit,
            initialCash,
            netProfit,
            totalExpense
        })

        expect(DailyReport.create).toHaveBeenCalledWith({
            userId: 'user-id',
            date,
            initialCash,
            finalCash,
            totalExpense,
            grossProfit,
            netProfit
        })

        expect(Expense.insertMany).toHaveBeenCalledWith([
            {
                amount: 50,
                userId: 'user-id',
                dailyReportId: 'report-id'
            }
        ])

        expect(DailyReport.create).toHaveBeenCalledTimes(1)
        expect(Expense.insertMany).toHaveBeenCalledTimes(1)
    })
})
afterEach(() => {
    jest.clearAllMocks()
})
describe("updateCashRegisterService", () => {
    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            updateCashRegisterService({
                dailyreportID: 'report-id',
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')
    })

    it("testar se retorna erro ao colocar data futura", async () => {
        User.findOne.mockResolvedValue(mockUser())
        const date = new Date();
        date.setDate(date.getDate() + 1);

        await expect(updateCashRegisterService({
            user: { uid: 'firebase-uid' },
            date
        },
        )).rejects.toThrow('Não é permitido criar caixa para datas futuras');
    })

    it("testar se retorna erro ao colocar uma data que já existe um dailyReport", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id'
        });

        const date = new Date();

        await expect(updateCashRegisterService({
            user: { uid: 'firebase-uid' },
            date
        },
        )).rejects.toThrow('Já existe um caixa registrado para este dia');
    })

    it("testar se retorna erro caso a renda bruta seja negativa e não tenha tido despesas", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue(null);

        const date = new Date();
        const initialCash = 0
        const finalCash = -20

        await expect(updateCashRegisterService({
            user: { uid: 'firebase-uid' },
            date,
            expensesData: [],
            initialCash,
            finalCash
        },
        )).rejects.toThrow('Lucro negativo sem despesas registradas');
    })

    it("testar se retorna erro caso as despesas sejam maiores que a renda disponível", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue(null);

        const date = new Date();
        const initialCash = 0
        const finalCash = 20
        const expensesData = [
            { amount: 30 }
        ]
        await expect(updateCashRegisterService({
            user: { uid: 'firebase-uid' },
            date,
            expensesData,
            initialCash,
            finalCash
        },
        )).rejects.toThrow('Despesas incompatíveis com o caixa informado');
    })

    it("sucesso ao alterar um caixa enviando nenhuma despesa", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id'
        });

        const date = new Date();
        const initialCash = 40;
        const finalCash = 200;
        const totalExpense = 0
        const grossProfit = (finalCash - initialCash) + totalExpense
        const netProfit = grossProfit - totalExpense


        DailyReport.findOneAndUpdate.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id',
            date,
            initialCash,
            finalCash,
            totalExpense,
            grossProfit,
            netProfit
        })

        Expense.deleteMany.mockResolvedValue({ "acknowledged": true, "deletedCount": 1 })

        await expect(updateCashRegisterService({
            dailyReportID: 'report-id',
            user: { uid: 'firebase-uid' },
            date,
            expensesData: [],
            initialCash,
            finalCash
        })).resolves.toEqual({
            _id: "report-id",
            userId: "user-id",
            date,
            finalCash,
            grossProfit,
            initialCash,
            netProfit,
            totalExpense
        })

        expect(Expense.insertMany).not.toHaveBeenCalled()
        expect(Expense.deleteMany).toHaveBeenCalledTimes(1)

        expect(DailyReport.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: 'report-id', userId: 'user-id' }
            ,
            expect.objectContaining({
                initialCash,
                finalCash,
                totalExpense,
                grossProfit,
                netProfit
            }),
            { new: true }
        )
    })

    it("sucesso ao alterar um caixa enviando com despesas", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id'
        });

        const expensesData = [{
            amount: 50
        }];

        const date = new Date();
        const initialCash = 40;
        const finalCash = 200;
        const totalExpense = 50;
        const grossProfit = (finalCash - initialCash) + totalExpense
        const netProfit = grossProfit - totalExpense


        DailyReport.findOneAndUpdate.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id',
            date,
            initialCash,
            finalCash,
            totalExpense,
            grossProfit,
            netProfit
        })

        Expense.deleteMany.mockResolvedValue({ "acknowledged": true, "deletedCount": 1 })

        await expect(updateCashRegisterService({
            dailyReportID: 'report-id',
            user: { uid: 'firebase-uid' },
            date,
            expensesData,
            initialCash,
            finalCash
        })).resolves.toEqual({
            _id: "report-id",
            userId: "user-id",
            date,
            finalCash,
            grossProfit,
            initialCash,
            netProfit,
            totalExpense
        })

        expect(Expense.insertMany).toHaveBeenCalledTimes(1)
        expect(Expense.deleteMany).toHaveBeenCalledTimes(1)

        

        expect(DailyReport.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: 'report-id', userId: 'user-id' }
            ,
            expect.objectContaining({
                initialCash,
                finalCash,
                totalExpense,
                grossProfit,
                netProfit
            }),
            { new: true }
        )

        expect(Expense.insertMany).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    amount: 50,
                    userId: 'user-id',
                    dailyReportId: 'report-id'
                })
            ])
        )
    })
})
afterEach(() => {
    jest.clearAllMocks()
})
describe("deleteCashRegisterService", () => {
    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            deleteCashRegisterService({
                dailyReportID: 'report-id',
                user: { uid: 'firebase-uid' }
            })
        ).rejects.toThrow('Usuário não encontrado.')
    })

    it("testar se retorna erro ao tentar deletar um Daily Report que não existe", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue(null);

        await expect(deleteCashRegisterService({
            dailyReportID: 'report-id',
            user: { uid: 'firebase-uid' }
        },
        )).rejects.toThrow('Caixa inexistente!');

        expect(DailyReport.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                _id: 'report-id'
            })
        )
    })

    it("sucesso ao deletar um daily report", async () => {
        User.findOne.mockResolvedValue(mockUser())

        DailyReport.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id'
        });

        DailyReport.findOneAndDelete.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id'
        })

        await expect(deleteCashRegisterService({
            dailyReportID: 'report-id',
            user: { uid: 'firebase-uid' }
        }
        )).resolves.toEqual({
            userId: 'user-id',
            _id: 'report-id'
        })

        expect(DailyReport.findOne).toHaveBeenCalledTimes(1)
        expect(DailyReport.findOneAndDelete).toHaveBeenCalledTimes(1)

        expect(User.findOne).toHaveBeenCalledWith({
            firebaseUid: 'firebase-uid'
        })
        expect(DailyReport.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                _id: 'report-id'
            })
        )

        expect(DailyReport.findOneAndDelete).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-id',
                _id: 'report-id'
            })
        )
    })
})