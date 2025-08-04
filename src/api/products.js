import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});


export const getAllProducts = () => api.get('/products/');
export const getProductById = (id) => api.get(`/products/${id}/`);
export const createProduct = (data) => api.post('/products/', data);
export const updateProduct = (id, data) => api.put(`/products/${id}/`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}/`);


export const createMovementStock = (data) => api.post('/stocks/movements/', data);
export const getAllMovements = () => api.get('/stocks/movements/');
export const getMovementById = (id) => api.get(`/stocks/movements/${id}/`);
export const getMovementsByProductId = (productId) => api.get(`/stocks/movements/product/${productId}/`);
