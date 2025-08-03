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
