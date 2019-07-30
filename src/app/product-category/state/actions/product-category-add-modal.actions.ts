import { props, createAction } from '@ngrx/store';

import { ProductCategory } from '@app/product-category/models/product-category';

export const addProductCategory = createAction(
  '[ProductCategory add  modal] Add',
  props<{ productCategory: ProductCategory }>()
);
