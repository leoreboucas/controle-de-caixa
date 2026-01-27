import axios from "axios";


export const getProducts = async (token) => {
    const data = await axios.get("http://localhost:3000/products", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const newProduct = async (token, product) => {
    const data = await axios.post("http://localhost:3000/products", product, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const getProductsById = async(token, id) => {
    const data = await axios.get(`http://localhost:3000/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const updateProduct = async(token, id, product) => {
    const data = await axios.patch(`http://localhost:3000/products/${id}`, product, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const deleteProduct = async(token, id) => {
    const data = await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}