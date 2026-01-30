import axios from "axios";


export const getDailyReport = async (token) => {
    const data = await axios.get("http://localhost:3000/daily-report", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const newDailyReport = async (token, dailyReport) => {
    const data = await axios.post("http://localhost:3000/daily-report", dailyReport, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const getDailyReportById = async (token, id) => {
    const data = await axios.get(`http://localhost:3000/daily-report/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    return data
}

export const updateDailyReport = async (token, id, dailyReport) => {
    const data = await axios.patch(`http://localhost:3000/daily-report/${id}`, dailyReport, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const deleteDailyReport = async (token, id) => {
    const data = await axios.delete(`http://localhost:3000/daily-report/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}