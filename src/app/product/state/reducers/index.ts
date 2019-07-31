import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';

import * as fromRoot from '@app/core/state/reducers';
import * as fromProductCollection from '@app/product/state/reducers/product-collection.reducer';
import * as fromProductEntities from '@app/product/state/reducers/product-entities.reducer';
import * as fromAuth from '@app/authentication/state/reducers';
import { Product } from '@app/product/models/product';
import { Authorization } from '@app/core/models/authorization.model';

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

export const selectProductsState = createFeatureSelector<
  State,
  ProductsState
>('products');

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

export const canUpdateProduct = createSelector(
  fromAuth.getAuthorized(['ROLE_PRODUCT_EDIT']),
  canUpdate => canUpdate
);

export const canDeleteProduct = createSelector(
  fromAuth.getAuthorized(['ROLE_PRODUCT_DELETE']),
  canDelete => canDelete
);

export const canCreateProduct = createSelector(
  fromAuth.getAuthorized(['ROLE_PRODUCT_CREATE']),
  canCreate => canCreate
);

export const getProductAuthorization = createSelector(
  canUpdateProduct,
  canDeleteProduct,
  canCreateProduct,
  (canUpdate, canDelete, canAdd): Authorization => {
    return {
      update: canUpdate,
      delete: canDelete,
      create: canAdd
    };
  }
);
