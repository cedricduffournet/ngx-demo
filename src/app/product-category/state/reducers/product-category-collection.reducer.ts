import { createReducer, on } from '@ngrx/store';

import {
  ProductCategoryAddModalActions,
  ProductCategoryDeleteModalActions,
  ProductCategoryListViewActions,
  ProductCategoryApiActions
} from '@app/product-category/state/actions';

export interface State {
  ids: number[];
  loading: boolean;
  loaded: boolean;
  deleting: boolean;
  deleted: boolean;
  adding: boolean;
  added: boolean;
}

export const INITIAL_STATE: State = {
  ids: [],
  adding: false,
  added: false,
  deleting: false,
  deleted: false,
  loading: false,
  loaded: false
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(ProductCategoryListViewActions.loadProductCategories, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(ProductCategoryApiActions.loadProductCategorySuccess, (state, { productCategories }) => ({
    ...state,
    loading: false,
    loaded: true,
    ids: productCategories.result
  })),
  on(ProductCategoryApiActions.loadProductCategoryFailure, state => ({
    ...state,
    loading: false,
    loaded: false
  })),
  on(ProductCategoryAddModalActions.addProductCategory, state => ({
    ...state,
    adding: true,
    added: false
  })),
  on(ProductCategoryApiActions.addProductCategorySuccess, (state, { productCategory }) => ({
    ...state,
    ids: [...state.ids, productCategory.result],
    adding: false,
    added: true
  })),
  on(
    ProductCategoryApiActions.addProductCategoryFailure,
    ProductCategoryListViewActions.showAddProductCategoryModal,
    state => ({
      ...state,
      adding: false,
      added: false
    })
  ),
  on(ProductCategoryDeleteModalActions.deleteProductCategory, state => ({
    ...state,
    deleting: true,
    deleted: false
  })),
  on(ProductCategoryApiActions.deleteProductCategorySuccess, (state, { id }) => ({
    ...state,
    ids: state.ids.filter(productCategoryId => productCategoryId !== id),
    deleting: false,
    deleted: true
  })),
  on(
    ProductCategoryApiActions.deleteProductCategoryFailure,
    ProductCategoryListViewActions.showDeleteProductCategoryModal,
    state => ({
      ...state,
      deleting: false,
      deleted: false
    })
  )
);

export const getIds = (state: State) => state.ids;
export const getDeleting = (state: State) => state.deleting;
export const getDeleted = (state: State) => state.deleted;
export const getAdding = (state: State) => state.adding;
export const getAdded = (state: State) => state.added;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
