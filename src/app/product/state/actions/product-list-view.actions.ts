import { props, createAction } from '@ngrx/store';

export const loadProducts = createAction('[Product list view] Load list');

export type displayType = 'list' | 'add' | 'update' | 'delete';

export const showAddProductModal = createAction(
  '[Product list view] Show add modal'
);

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
