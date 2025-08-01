// ../types/store.ts
export interface Store {
  id: number;
  name: string;
  cnpj: string;
  city: string;
  uf: string;
  zip_code: string;
  address: string;
  email: string;
  phone_number: string;
  image?: string;
}