import axios from "axios";

// Funções para interagir com a API de Daily Reports

// Obter todos os daily reports
export const getDailyReport = async (token) => {
    const data = await axios.get("http://localhost:3000/daily-report", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Criar um novo daily report
export const newDailyReport = async (token, dailyReport) => {
    const data = await axios.post("http://localhost:3000/daily-report", dailyReport, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Obter daily report por ID
export const getDailyReportById = async (token, id) => {
    const data = await axios.get(`http://localhost:3000/daily-report/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    return data
}

// Atualizar daily report
export const updateDailyReport = async (token, id, dailyReport) => {
    const data = await axios.patch(`http://localhost:3000/daily-report/${id}`, dailyReport, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Deletar daily report
export const deleteDailyReport = async (token, id) => {
    const data = await axios.delete(`http://localhost:3000/daily-report/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}