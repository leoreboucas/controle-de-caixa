import axios from "axios";

// Funções para interagir com a API de Expenses

// Obter despesas por ID do daily report
export const getExpense = async (token, dailyReportId) => {
    const data = await axios.get(`http://localhost:3000/daily-report/expense/${dailyReportId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
        
    })
    return data
}
