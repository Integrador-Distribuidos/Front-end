// ../types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  image?: string;
  quantity?: number;
}

export interface ProductStock {
  id_product: number;
  id_stock: number;
  quantity: number;
  last_update_date: string;
}