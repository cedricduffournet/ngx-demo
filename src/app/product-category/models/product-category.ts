import { schema } from 'normalizr';

export interface ProductCategory {
  id: number;
  name: string;
}

export const productCategorySchema = new schema.Entity('productCategories');
