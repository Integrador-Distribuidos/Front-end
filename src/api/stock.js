import api from './index.js';


export const getAllStocks = () => api.get('/api/stocks/');
export const getStockById = (id) => api.get(`/api/stocks/${id}/`);
export const getStocksByStoreId = (storeId) => api.get(`/api/stocks/store/${storeId}/`);
export const createStock = (data) => api.post('/api/stocks/', data);
export const updateStock = (id, data) => api.put(`/api/stocks/${id}/`, data);
export const deleteStock = (id) => api.delete(`/api/stocks/${id}/`);
export const createMovementStock = (data) => api.post('/api/stocks/movements/', data);
