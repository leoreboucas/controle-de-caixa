const { getExpenseService } = require('../expenseService')
const DailyReport = require('../../models/DailyReport')
const Expense = require('../../models/Expense')
const User = require('../../models/User')

jest.mock('../../models/User', () => ({
    findOne: jest.fn(),
}))

jest.mock('../../models/DailyReport', () => ({
    findOne: jest.fn(),
}))

jest.mock('../../models/Expense', () => ({
    find: jest.fn()
}))

describe("getExpenseService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('deve lançar erro se o usuário não existir', async () => {
        User.findOne.mockResolvedValue(null)

        await expect(
            getExpenseService({
                user: { uid: 'firebase-uid' },
                dailyReportID: 'report-id'
            })
        ).rejects.toThrow('Usuário não encontrado.')
    })
    it("deve lançar erro se o caixa não existir", async () => {
        User.findOne.mockResolvedValue({
            _id: 'user-id',
            firebaseUid: 'firebase-uid',
            email: 'usertest@test.com',
        })

        DailyReport.findOne.mockResolvedValue(null)

        await expect(getExpenseService({
            user: { uid: 'firebase-uid' },
            dailyReportID: 'report-id'
        })).rejects.toThrow("Caixa não existe!")
    })

    it("sucesso ao listar as despesas", async () => {
        User.findOne.mockResolvedValue({
            _id: 'user-id',
            firebaseUid: 'firebase-uid',
            email: 'usertest@test.com',
        })

        DailyReport.findOne.mockResolvedValue({
            userId: 'user-id',
            _id: 'report-id'
        })

        Expense.find.mockResolvedValue([{
            userId: 'user-id',
            dailyReportId: 'report-id',
            description: 'produto-teste',
            amount: 50
        }])

        await expect(getExpenseService({
            user: { uid: 'firebase-uid' },
            dailyReportID: 'report-id'
        })).resolves.toEqual([{
            userId: 'user-id',
            dailyReportId: 'report-id',
            description: 'produto-teste',
            amount: 50
        }])

        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(DailyReport.findOne).toHaveBeenCalledTimes(1)
        expect(Expense.find).toHaveBeenCalledTimes(1)

        expect(User.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                firebaseUid: "firebase-uid"
            })
        )
        expect(DailyReport.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: 'report-id',
                userId: 'user-id'
            })
        )

        expect(Expense.find).toHaveBeenCalledWith(
            expect.objectContaining({
                    userId: 'user-id',
                    dailyReportId: 'report-id'
             })
        )
    })
})