import api from './index';
import { Product, ProductStock } from './types/product';

export const getAllProducts = () => api.get<Product[]>('/api/products/all');
export const getProductsforUser = () => api.get<Product[]>('/api/products/');
export const getProductById = (id: number) => api.get<Product>(`/api/products/${id}`);

export const createProduct = async (data: Product) => {
  const response = await api.post('/api/products/', data);
  return response.data; // ← isso retorna o produto criado, incluindo o id_product
};

export const updateProduct = async (id: number, data: Product) => {
    const response = await api.put(`/api/products/${id}`, data);
    return response.data;
}


export const deleteProduct = (id: number) => api.delete(`/api/products/${id}`);

export const addProductStock = (data: ProductStock) => api.post(`/api/stocks/product/`, data);


export const uploadImageProduct = (id: number, data: FormData) => {
  return api.post(`/api/products/${id}/upload-image/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};