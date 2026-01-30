import axios from "axios";


export const getExpense = async (token, dailyReportId) => {
    const data = await axios.get(`http://localhost:3000/daily-report/expense/${dailyReportId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
        
    })
    return data
}
