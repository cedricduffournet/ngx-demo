import { props, createAction } from '@ngrx/store';

import { ProductCategory } from '@app/product-category/models/product-category';

export const deleteProductCategory = createAction(
  '[ProductCategory delete modal] Delete',
  props<{ productCategory: ProductCategory }>()
);
