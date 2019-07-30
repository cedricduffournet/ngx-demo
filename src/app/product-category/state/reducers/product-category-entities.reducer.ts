import { createReducer, on } from '@ngrx/store';

import { EntityState } from '@app/shared/models/EntityState';
import {
  ProductCategoryListViewActions,
  ProductCategoryApiActions,
  ProductCategoryUpdateModalActions
} from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';
import { NormalizedData } from '@app/shared/models/normalized.model';

export type ProductCategoryEntities = EntityState<ProductCategory>;

export interface State {
  entities: ProductCategoryEntities;
  selectedId: number | null;
  updating: boolean;
  updated: boolean;
}

export const INITIAL_STATE: State = {
  entities: {},
  selectedId: null,
  updating: false,
  updated: false
};

function updateProductCategory(state: State, productCategory: NormalizedData): State {
  const id: number = productCategory.result;
  return {
    ...state,
    entities: {
      ...state.entities,
      [id]: productCategory.entities.productCategories[id]
    },
    updated: true,
    updating: false
  };
}
export const reducer = createReducer(
  INITIAL_STATE,
  on(ProductCategoryApiActions.loadProductCategorySuccess, (state, { productCategories }) => ({
    ...state,
    entities: productCategories.entities.productCategories
  })),
  on(ProductCategoryUpdateModalActions.updateProductCategory, state => ({
    ...state,
    updated: false,
    updating: true
  })),
  on(ProductCategoryApiActions.updateProductCategorySuccess, (state, { productCategory }) =>
    updateProductCategory(state, productCategory)
  ),
  on(
    ProductCategoryApiActions.updateProductCategoryFailure,
    ProductCategoryListViewActions.showUpdateProductCategoryModal,
    state => ({
      ...state,
      updating: false,
      updated: false
    })
  ),
  on(ProductCategoryApiActions.addProductCategorySuccess, (state, { productCategory }) => ({
    ...state,
    entities: {
      ...state.entities,
      ...productCategory.entities.productCategories
    }
  })),
  on(ProductCategoryListViewActions.selectProductCategory, (state, { id }) => ({
    ...state,
    selectedId: id
  }))
);

export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId as number;
export const getUpdating = (state: State) => state.updating;
export const getUpdated = (state: State) => state.updated;
