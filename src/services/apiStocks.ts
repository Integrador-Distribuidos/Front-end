import api from './index';
import { Stock, StockMovement } from './types/stock';

export const getAllStocks = () => api.get<Stock[]>('/api/stocks/all/');
export const getStockById = (id: number) => api.get<Stock>(`/api/stocks/${id}`);
export const createStock = (data: Stock) => api.post('/api/stocks/', data);
export const updateStock = (id: number, data: Stock) => api.put(`/api/stocks/${id}`, data);
export const deleteStock = (id: number) => api.delete(`/api/stocks/${id}`);


export const createMovementStock = (data: StockMovement) => api.post('/api/stocks/movements/', data);