import { schema } from 'normalizr';
import { ProductCategory, productCategorySchema } from '@app/product-category/models/product-category';

export interface Product {
  id: number;
  name: string;
  categories: ProductCategory[];
}

export const productSchema = new schema.Entity('products', {
  categories: [productCategorySchema]
});
