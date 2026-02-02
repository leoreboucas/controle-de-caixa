import axios from "axios";

// Funções para interagir com a API de Products

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Obter todos os produtos
export const getProducts = async (token) => {
    const data = await axios.get(`${API_URL}/products`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Criar novo produto
export const newProduct = async (token, product) => {
    const data = await axios.post(`${API_URL}/products`, product, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Obter produto por ID
export const getProductsById = async(token, id) => {
    const data = await axios.get(`${API_URL}/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Atualizar produto
export const updateProduct = async(token, id, product) => {
    const data = await axios.patch(`${API_URL}/products/${id}`, product, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

// Deletar produto
export const deleteProduct = async(token, id) => {
    const data = await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}