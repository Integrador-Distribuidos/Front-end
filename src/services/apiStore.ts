import api from './index';
import { Store } from './types/store';

export const getAllStores = () => api.get<Store[]>('/api/stores/all');
export const getStoresByUserID = () => api.get<Store[]>('/api/stores/');
export const getStoreById = (id: number) => api.get<Store>(`/api/stores/${id}`);
export const deleteStore = (id: number) => api.delete(`/api/stores/${id}`);



export const createStore = async (data: Store) => {
  const response = await api.post('/api/stores/', data);
  return response.data;
};

export const updateStore = async (id: number, data: Store) => {
    const response = await api.put(`/api/stores/${id}`, data);
    return response.data;
}


export const uploadImageStore = (id: number, data: FormData) => {
  return api.post(`/api/stores/${id}/upload-image/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};