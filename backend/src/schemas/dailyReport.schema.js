const { z } = require('zod')

const createDailyReportSchema = z.object({
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Data inválida!'
    }).transform(val => new Date(val)),
    initialCash: z.number().nonnegative('Deve ser um valor maior que 0.'),
    finalCash: z.number().nonnegative('Deve ser um valor maior que 0.'),
    expensesData: z.array(
        z.object({
            description: z.string().trim().min(1, 'Descrição obrigatória'),
            amount: z.number().positive('Valor inválido')
        })
    ).optional()
})

const updateDailyReportSchema = z.object({
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Data inválida!'
    }).transform(val => new Date(val)),
    initialCash: z.number().nonnegative('Deve ser um valor maior que 0.'),
    finalCash: z.number().nonnegative('Deve ser um valor maior que 0.'),
    expensesData: z.array(
        z.object({
            description: z.string().trim().min(1, 'Descrição obrigatória'),
            amount: z.number().positive('Valor inválido')
        })
    ).optional()
})

module.exports = {
    createDailyReportSchema,
    updateDailyReportSchema
}