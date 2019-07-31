import { createReducer, on } from '@ngrx/store';

import { EntityState } from '@app/shared/models/EntityState';
import {
  ProductListViewActions,
  ProductApiActions,
  ProductUpdateModalActions
} from '@app/product/state/actions';
import { Product } from '@app/product/models/product';
import { NormalizedData } from '@app/shared/models/normalized.model';

export type ProductEntities = EntityState<Product>;

export interface State {
  entities: ProductEntities;
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

function updateProduct(state: State, product: NormalizedData): State {
  const id: number = product.result;
  return {
    ...state,
    entities: {
      ...state.entities,
      [id]: product.entities.products[id]
    },
    updated: true,
    updating: false
  };
}
export const reducer = createReducer(
  INITIAL_STATE,
  on(ProductApiActions.loadProductSuccess, (state, { products }) => ({
    ...state,
    entities: products.entities.products
  })),
  on(ProductUpdateModalActions.updateProduct, state => ({
    ...state,
    updated: false,
    updating: true
  })),
  on(ProductApiActions.updateProductSuccess, (state, { product }) =>
    updateProduct(state, product)
  ),
  on(
    ProductApiActions.updateProductFailure,
    ProductListViewActions.showUpdateProductModal,
    state => ({
      ...state,
      updating: false,
      updated: false
    })
  ),
  on(ProductApiActions.addProductSuccess, (state, { product }) => ({
    ...state,
    entities: {
      ...state.entities,
      ...product.entities.products
    }
  })),
  on(ProductListViewActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedId: id
  }))
);

export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId as number;
export const getUpdating = (state: State) => state.updating;
export const getUpdated = (state: State) => state.updated;
