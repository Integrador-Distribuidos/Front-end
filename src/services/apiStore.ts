import api from './index';
import { Store } from './types/store';

export const getAllStores = () => api.get<Store[]>('/api/stores/');
export const getStoreById = (id: number) => api.get<Store>(`/api/stores/${id}`);
export const createStore = (data: Store) => api.post('/api/stores/', data);
export const updateStore = (id: number, data: Store) => api.put(`/api/stores/${id}`, data);
export const deleteStore = (id: number) => api.delete(`/api/stores/${id}`);