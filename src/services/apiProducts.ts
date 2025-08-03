import api from './index';
import { Product } from './types/product';

export const getAllProducts = () => api.get<Product[]>('/api/products/');
export const getProductById = (id: number) => api.get<Product>(`/api/products/${id}`);
export const createProduct = (data: Product) => api.post('/api/products/', data);
export const updateProduct = (id: number, data: Product) => api.put(`/api/products/${id}`, data);
export const deleteProduct = (id: number) => api.delete(`/api/products/${id}`);
