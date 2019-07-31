import { props, createAction } from '@ngrx/store';

import { Product } from '@app/product/models/product';

export const addProduct = createAction(
  '[Product add  modal] Add',
  props<{ product: Product }>()
);
