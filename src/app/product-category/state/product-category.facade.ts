import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  ProductCategoryListViewActions,
  ProductCategoryAddModalActions,
  ProductCategoryDeleteModalActions,
  ProductCategoryUpdateModalActions
} from '@app/product-category/state/actions';
import * as fromProductCategories from '@app/product-category/state/reducers';
import { ProductCategory } from '@app/product-category/models/product-category';

@Injectable()
export class ProductCategoryFacade {
  productCategories$ = this.store.pipe(select(fromProductCategories.getProductCategories));
  loading$ = this.store.pipe(select(fromProductCategories.getProductCategoryCollectionLoading));
  added$ = this.store.pipe(select(fromProductCategories.getProductCategoryCollectionAdded));
  adding$ = this.store.pipe(select(fromProductCategories.getProductCategoryCollectionAdding));
  updated$ = this.store.pipe(select(fromProductCategories.getProductCategoryEntitiesUpdated));
  updating$ = this.store.pipe(
    select(fromProductCategories.getProductCategoryEntitiesUpdating)
  );
  deleted$ = this.store.pipe(
    select(fromProductCategories.getProductCategoryCollectionDeleted)
  );
  deleting$ = this.store.pipe(
    select(fromProductCategories.getProductCategoryCollectionDeleting)
  );
  selected$ = this.store.pipe(select(fromProductCategories.getSelectedProductCategory));

  constructor(private store: Store<fromProductCategories.State>) {}

  loadProductCategories() {
    this.store.dispatch(ProductCategoryListViewActions.loadProductCategories());
  }

  showAddProductCategoryModal() {
    this.store.dispatch(ProductCategoryListViewActions.showAddProductCategoryModal());
  }

  selectProductCategory(id: number) {
    this.store.dispatch(ProductCategoryListViewActions.selectProductCategory({ id }));
  }

  showUpdateProductCategoryModal() {
    this.store.dispatch(ProductCategoryListViewActions.showUpdateProductCategoryModal());
  }

  showDeleteProductCategoryModal() {
    this.store.dispatch(ProductCategoryListViewActions.showDeleteProductCategoryModal());
  }

  addProductCategory(productCategory: ProductCategory) {
    this.store.dispatch(ProductCategoryAddModalActions.addProductCategory({ productCategory }));
  }

  deleteProductCategory(productCategory: ProductCategory) {
    this.store.dispatch(
      ProductCategoryDeleteModalActions.deleteProductCategory({ productCategory })
    );
  }

  updateProductCategory(data: { id: number; productCategory: ProductCategory }) {
    this.store.dispatch(ProductCategoryUpdateModalActions.updateProductCategory({ data }));
  }
}
