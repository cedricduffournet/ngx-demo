import { props, createAction } from '@ngrx/store';

import { Product } from '@app/product/models/product';

export const updateProduct = createAction(
  '[Product update modal] Update',
  props<{ data: { id: number; product: Product } }>()
);
