import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
});

export const getStores = () => api.get('/stores/');
export const createStore = (data) => api.post('/stores/', data);
export const updateStore = (id, data) => api.put(`/stores/${id}/`, data);
export const deleteStore = (id) => api.delete(`/stores/${id}/`);
