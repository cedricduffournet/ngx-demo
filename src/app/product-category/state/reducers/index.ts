import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';

import * as fromRoot from '@app/core/state/reducers';
import * as fromProductCategoryCollection from '@app/product-category/state/reducers/product-category-collection.reducer';
import * as fromProductCategoryEntities from '@app/product-category/state/reducers/product-category-entities.reducer';
import * as fromAuth from '@app/authentication/state/reducers';
import { ProductCategory } from '@app/product-category/models/product-category';
import { Authorization } from '@app/core/models/authorization.model';

export interface ProductCategoriesState {
  collection: fromProductCategoryCollection.State;
  productCategories: fromProductCategoryEntities.State;
}

export interface State extends fromRoot.State {
  productCategories: ProductCategoriesState;
}

export function reducers(state: ProductCategoriesState | undefined, action: Action) {
  return combineReducers({
    collection: fromProductCategoryCollection.reducer,
    productCategories: fromProductCategoryEntities.reducer
  })(state, action);
}

export const selectProductCategoriesState = createFeatureSelector<
  State,
  ProductCategoriesState
>('productCategories');

export const getProductCategoryEntitiesState = createSelector(
  selectProductCategoriesState,
  state => state.productCategories
);

export const getProductCategoryEntities = createSelector(
  getProductCategoryEntitiesState,
  fromProductCategoryEntities.getEntities
);

export const getProductCategoryEntitiesUpdating = createSelector(
  getProductCategoryEntitiesState,
  fromProductCategoryEntities.getUpdating
);

export const getProductCategoryEntitiesUpdated = createSelector(
  getProductCategoryEntitiesState,
  fromProductCategoryEntities.getUpdated
);

export const getProductCategoryCollectionState = createSelector(
  selectProductCategoriesState,
  state => state.collection
);
export const getProductCategoryIds = createSelector(
  getProductCategoryCollectionState,
  fromProductCategoryCollection.getIds
);
export const getProductCategoryCollectionAdding = createSelector(
  getProductCategoryCollectionState,
  fromProductCategoryCollection.getAdding
);
export const getProductCategoryCollectionAdded = createSelector(
  getProductCategoryCollectionState,
  fromProductCategoryCollection.getAdded
);
export const getProductCategoryCollectionDeleting = createSelector(
  getProductCategoryCollectionState,
  fromProductCategoryCollection.getDeleting
);
export const getProductCategoryCollectionDeleted = createSelector(
  getProductCategoryCollectionState,
  fromProductCategoryCollection.getDeleted
);

export const getProductCategories = createSelector(
  getProductCategoryEntities,
  getProductCategoryIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getSelectedProductCategoryId = createSelector(
  getProductCategoryEntitiesState,
  fromProductCategoryEntities.getSelectedId
);

export const getSelectedProductCategory = createSelector(
  getProductCategoryEntities,
  getSelectedProductCategoryId,
  (productCategoryEntities, productCategoryId): ProductCategory => {
    return productCategoryEntities[productCategoryId];
  }
);

export const canUpdateProductCategory = createSelector(
  fromAuth.getAuthorized(['ROLE_PRODUCT_CATEGORY_EDIT']),
  canUpdate => canUpdate
);

export const canDeleteProductCategory = createSelector(
  fromAuth.getAuthorized(['ROLE_PRODUCT_CATEGORY_DELETE']),
  canDelete => canDelete
);

export const canCreateProductCategory = createSelector(
  fromAuth.getAuthorized(['ROLE_PRODUCT_CATEGORY_CREATE']),
  canCreate => canCreate
);

export const getProductCategoryAuthorization = createSelector(
  canUpdateProductCategory,
  canDeleteProductCategory,
  canCreateProductCategory,
  (canUpdate, canDelete, canAdd): Authorization => {
    return {
      update: canUpdate,
      delete: canDelete,
      create: canAdd
    };
  }
);
