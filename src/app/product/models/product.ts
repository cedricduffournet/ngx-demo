import { schema } from 'normalizr';
import {
  ProductCategory,
  productCategorySchema
} from '@app/product-category/models/product-category';

export interface ProductBase {
  id: number;
  name: string;
  description: string;
  priceAmount: number;
}

export interface Product extends ProductBase {
  categories: number[];
}

export interface ProductFull extends ProductBase {
  categories: ProductCategory[];
}

export const productSchema = new schema.Entity('products', {
  categories: [productCategorySchema]
});

export const getPrice = (price: number) => {
  if (price > 0) {
    return price / 100;
  }
  return 0;
};
