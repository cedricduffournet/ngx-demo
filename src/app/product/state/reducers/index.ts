import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';

import * as fromRoot from '@app/core/state/reducers';
import * as fromProductCollection from '@app/product/state/reducers/product-collection.reducer';
import * as fromProductEntities from '@app/product/state/reducers/product-entities.reducer';
import * as fromProductCategories from '@app/product-category/state/reducers';

import { Product } from '@app/product/models/product';

export interface ProductsState {
  collection: fromProductCollection.State;
  products: fromProductEntities.State;
}

export interface State extends fromRoot.State {
  products: ProductsState;
}

export function reducers(state: ProductsState | undefined, action: Action) {
  return combineReducers({
    collection: fromProductCollection.reducer,
    products: fromProductEntities.reducer
  })(state, action);
}

export const selectProductsState = createFeatureSelector<ProductsState>(
  'products'
);

export const getProductEntitiesState = createSelector(
  selectProductsState,
  state => state.products
);

export const getProductEntities = createSelector(
  getProductEntitiesState,
  fromProductEntities.getEntities
);

export const getProductEntitiesUpdating = createSelector(
  getProductEntitiesState,
  fromProductEntities.getUpdating
);

export const getProductEntitiesUpdated = createSelector(
  getProductEntitiesState,
  fromProductEntities.getUpdated
);

export const getProductCollectionState = createSelector(
  selectProductsState,
  state => state.collection
);

export const getProductIds = createSelector(
  getProductCollectionState,
  fromProductCollection.getIds
);

export const getProductCollectionAdding = createSelector(
  getProductCollectionState,
  fromProductCollection.getAdding
);

export const getProductCollectionAdded = createSelector(
  getProductCollectionState,
  fromProductCollection.getAdded
);

export const getProductCollectionDeleting = createSelector(
  getProductCollectionState,
  fromProductCollection.getDeleting
);

export const getProductCollectionDeleted = createSelector(
  getProductCollectionState,
  fromProductCollection.getDeleted
);

export const getProductCollectionConfig = createSelector(
  getProductCollectionState,
  fromProductCollection.getConfig
);
export const getProductCollectionTotalItems = createSelector(
  getProductCollectionState,
  fromProductCollection.getTotalItems
);

export const getProducts = createSelector(
  getProductEntities,
  getProductIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getSelectedProductId = createSelector(
  getProductEntitiesState,
  fromProductEntities.getSelectedId
);

export const getSelectedProduct = createSelector(
  getProductEntities,
  getSelectedProductId,
  (productEntities, productId): Product => {
    return productEntities[productId];
  }
);

export const getSelectedProductDenormalized = createSelector(
  getSelectedProduct,
  fromProductCategories.getProductCategoryEntities,
  (selected, productCategories) => {
    return {
      ...selected,
      categories: selected.categories.map(id => productCategories[id])
    };
  }
);
