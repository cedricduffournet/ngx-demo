import { props, createAction } from '@ngrx/store';

import { Product } from '@app/product/models/product';

export const deleteProduct = createAction(
  '[Product delete modal] Delete',
  props<{ product: Product }>()
);
