import api from './index.js';

export const getStores = () => api.get('/api/stores/');
export const createStore = (data) => api.post('/api/stores/', data);
export const updateStore = (id, data) => api.put(`/api/stores/${id}/`, data);
export const deleteStore = (id) => api.delete(`/api/stores/${id}/`);
