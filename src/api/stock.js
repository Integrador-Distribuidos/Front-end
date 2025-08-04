import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
});


export const getAllStocks = () => api.get('/stocks/');
export const getStockById = (id) => api.get(`/stocks/${id}/`);
export const getStocksByStoreId = (storeId) => api.get(`/stocks/store/${storeId}/`);
export const createStock = (data) => api.post('/stocks/', data);
export const updateStock = (id, data) => api.put(`/stocks/${id}/`, data);
export const deleteStock = (id) => api.delete(`/stocks/${id}/`);
export const createMovementStock = (data) => api.post('/stocks/movements/', data);
