import { props, createAction } from '@ngrx/store';

export const selectProduct = createAction(
  '[Product details ] Select item',
  props<{ id: number }>()
);
