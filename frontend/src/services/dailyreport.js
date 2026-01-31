import axios from "axios";

// Funções para interagir com a API de Daily Reports
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Obter todos os daily reports
export const getDailyReport = async (token) => {
    const data = await axios.get(`${API_URL}/daily-report`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Criar um novo daily report
export const newDailyReport = async (token, dailyReport) => {
    const data = await axios.post(`${API_URL}/daily-report`, dailyReport, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Obter daily report por ID
export const getDailyReportById = async (token, id) => {
    const data = await axios.get(`${API_URL}/daily-report/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    return data
}

// Atualizar daily report
export const updateDailyReport = async (token, id, dailyReport) => {
    const data = await axios.patch(`${API_URL}/daily-report/${id}`, dailyReport, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Deletar daily report
export const deleteDailyReport = async (token, id) => {
    const data = await axios.delete(`${API_URL}/daily-report/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}