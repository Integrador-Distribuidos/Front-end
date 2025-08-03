// ../types/stock.ts
export interface Stock {
  id_stock?: number;
  id_store: number;
  name: string;
  city: string;
  uf: string;
  zip_code: string;
  address: string;
}

export interface StockMovement {
  id_product: number;
  id_stock_origin: number;
  id_stock_destination: number;
  quantity: number;
  observation: string;
}