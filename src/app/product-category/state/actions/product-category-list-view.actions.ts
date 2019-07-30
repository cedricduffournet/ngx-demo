import { props, createAction } from '@ngrx/store';

export const loadProductCategories = createAction('[ProductCategory list view] Load list');

export type displayType = 'list' | 'add' | 'update' | 'delete';

export const showAddProductCategoryModal = createAction(
  '[ProductCategory list view] Show add modal'
);

export const showUpdateProductCategoryModal = createAction(
  '[ProductCategory list view] Show update modal'
);

export const showDeleteProductCategoryModal = createAction(
  '[ProductCategory list view] Show delete modal'
);

export const selectProductCategory = createAction(
  '[ProductCategory list view] Select item',
  props<{ id: number }>()
);
