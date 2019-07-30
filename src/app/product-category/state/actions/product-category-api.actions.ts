import { props, createAction } from '@ngrx/store';

import { NormalizedData } from '@app/shared/models/normalized.model';

export const loadProductCategorySuccess = createAction(
  '[ProductCategory API] Load SUCCESS',
  props<{ productCategories: NormalizedData }>()
);

export const loadProductCategoryFailure = createAction(
  '[ProductCategory API] Load FAILURE',
  props<{ error: any }>()
);

export const addProductCategorySuccess = createAction(
  '[ProductCategory API] Add SUCCESS',
  props<{ productCategory: NormalizedData }>()
);

export const addProductCategoryFailure = createAction(
  '[ProductCategory API] Add FAILURE',
  props<{ error: any }>()
);

export const updateProductCategorySuccess = createAction(
  '[ProductCategory API] Update  SUCCESS',
  props<{ productCategory: NormalizedData }>()
);

export const updateProductCategoryFailure = createAction(
  '[ProductCategory API] Update FAILURE',
  props<{ error: any }>()
);

export const deleteProductCategorySuccess = createAction(
  '[ProductCategory API] Delete SUCCESS',
  props<{ id: number }>()
);

export const deleteProductCategoryFailure = createAction(
  '[ProductCategory API] Delete FAILURE',
  props<{ error: any }>()
);
