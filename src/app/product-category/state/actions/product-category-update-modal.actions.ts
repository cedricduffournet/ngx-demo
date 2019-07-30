import { props, createAction } from '@ngrx/store';

import { ProductCategory } from '@app/product-category/models/product-category';

export const updateProductCategory = createAction(
  '[ProductCategory update modal] Update',
  props<{ data: { id: number; productCategory: ProductCategory } }>()
);
