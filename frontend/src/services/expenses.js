import axios from "axios";

// Funções para interagir com a API de Expenses

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Obter despesas por ID do daily report
export const getExpense = async (token, dailyReportId) => {
    const data = await axios.get(`${API_URL}/daily-report/expense/${dailyReportId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
        
    })
    return data
}
