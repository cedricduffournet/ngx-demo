import { createReducer, on } from '@ngrx/store';

import {
  ProductAddModalActions,
  ProductDeleteModalActions,
  ProductListViewActions,
  ProductApiActions
} from '@app/product/state/actions';

export interface State {
  ids: number[];
  loading: boolean;
  loaded: boolean;
  deleting: boolean;
  deleted: boolean;
  adding: boolean;
  added: boolean;
  totalItems: number;
  config: {
    page: number;
    itemsPerPage: number;
  };
}

export const INITIAL_STATE: State = {
  ids: [],
  adding: false,
  added: false,
  deleting: false,
  deleted: false,
  loading: false,
  loaded: false,
  totalItems: 0,
  config: {
    page: 1,
    itemsPerPage: 10
  }
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(ProductListViewActions.loadProducts, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(ProductApiActions.loadProductSuccess, (state, { products, meta }) => ({
    ...state,
    loading: false,
    loaded: true,
    ids: products.result,
    totalItems: meta.totalItems
  })),
  on(ProductApiActions.loadProductFailure, state => ({
    ...state,
    loading: false,
    loaded: false
  })),
  on(ProductAddModalActions.addProduct, state => ({
    ...state,
    adding: true,
    added: false
  })),
  on(ProductApiActions.addProductSuccess, (state, { product }) => ({
    ...state,
    ids: [...state.ids, product.result],
    adding: false,
    added: true
  })),
  on(
    ProductApiActions.addProductFailure,
    ProductListViewActions.navigateToAddProduct,
    state => ({
      ...state,
      adding: false,
      added: false
    })
  ),
  on(ProductDeleteModalActions.deleteProduct, state => ({
    ...state,
    deleting: true,
    deleted: false
  })),
  on(ProductApiActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    ids: state.ids.filter(productId => productId !== id),
    deleting: false,
    deleted: true
  })),
  on(
    ProductApiActions.deleteProductFailure,
    ProductListViewActions.showDeleteProductModal,
    state => ({
      ...state,
      deleting: false,
      deleted: false
    })
  ),
  on(ProductListViewActions.changePage, (state, { page }) => {
    const config = {
      ...state.config,
      page
    };

    return {
      ...state,
      config
    };
  })
);

export const getIds = (state: State) => state.ids;
export const getDeleting = (state: State) => state.deleting;
export const getDeleted = (state: State) => state.deleted;
export const getAdding = (state: State) => state.adding;
export const getAdded = (state: State) => state.added;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getConfig = (state: State) => state.config;
export const getTotalItems = (state: State) => state.totalItems;
