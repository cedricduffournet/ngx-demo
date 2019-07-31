import { props, createAction } from '@ngrx/store';

import { NormalizedData } from '@app/shared/models/normalized.model';

export const loadProductSuccess = createAction(
  '[Product API] Load SUCCESS',
  props<{ products: NormalizedData }>()
);

export const loadProductFailure = createAction(
  '[Product API] Load FAILURE',
  props<{ error: any }>()
);

export const addProductSuccess = createAction(
  '[Product API] Add SUCCESS',
  props<{ product: NormalizedData }>()
);

export const addProductFailure = createAction(
  '[Product API] Add FAILURE',
  props<{ error: any }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update  SUCCESS',
  props<{ product: NormalizedData }>()
);

export const updateProductFailure = createAction(
  '[Product API] Update FAILURE',
  props<{ error: any }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete SUCCESS',
  props<{ id: number }>()
);

export const deleteProductFailure = createAction(
  '[Product API] Delete FAILURE',
  props<{ error: any }>()
);
