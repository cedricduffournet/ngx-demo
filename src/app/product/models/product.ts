import { schema } from 'normalizr';

export interface Product {
  id: number;
  name: string;
}

export const productSchema = new schema.Entity('products');
