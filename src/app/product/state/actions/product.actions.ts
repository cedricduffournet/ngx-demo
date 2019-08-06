import { createAction, props } from '@ngrx/store';

import { NormalizedData } from '@app/shared/models/normalized.model';

export const loadProduct = createAction(
  '[Book Load Product Guard] Load Product',
  props<{ product: NormalizedData }>()
);
