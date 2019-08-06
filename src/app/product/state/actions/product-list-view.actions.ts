import { props, createAction } from '@ngrx/store';

export const loadProducts = createAction('[Product list view] Load list');

export type displayType = 'list' | 'add' | 'update' | 'delete';

export const showUpdateProductModal = createAction(
  '[Product list view] Show update modal'
);

export const showDeleteProductModal = createAction(
  '[Product list view] Show delete modal'
);

export const selectProduct = createAction(
  '[Product list view] Select item',
  props<{ id: number }>()
);

export const changePage = createAction(
  '[Product list view] Change page',
  props<{ page: number }>()
);

export const navigateToSelectedProduct = createAction(
  '[Product list view] Navigate to selected product'
);

export const navigateToAddProduct = createAction(
  '[Product list view] Navigate to add product page'
);
