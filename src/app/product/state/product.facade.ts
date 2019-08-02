import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  ProductListViewActions,
  ProductAddModalActions,
  ProductDeleteModalActions,
  ProductUpdateModalActions
} from '@app/product/state/actions';
import * as fromProducts from '@app/product/state/reducers';
import { Product } from '@app/product/models/product';

@Injectable()
export class ProductFacade {
  products$ = this.store.pipe(select(fromProducts.getProducts));
  added$ = this.store.pipe(select(fromProducts.getProductCollectionAdded));
  adding$ = this.store.pipe(select(fromProducts.getProductCollectionAdding));
  updated$ = this.store.pipe(select(fromProducts.getProductEntitiesUpdated));
  updating$ = this.store.pipe(
    select(fromProducts.getProductEntitiesUpdating)
  );
  deleted$ = this.store.pipe(
    select(fromProducts.getProductCollectionDeleted)
  );
  deleting$ = this.store.pipe(
    select(fromProducts.getProductCollectionDeleting)
  );
  selected$ = this.store.pipe(select(fromProducts.getSelectedProduct));
  totalItems$ = this.store.pipe(
    select(fromProducts.getProductCollectionTotalItems)
  );
  config$ = this.store.pipe(select(fromProducts.getProductCollectionConfig));

  constructor(private store: Store<fromProducts.State>) {}

  loadProducts() {
    this.store.dispatch(ProductListViewActions.loadProducts());
  }

  showAddProductModal() {
    this.store.dispatch(ProductListViewActions.showAddProductModal());
  }

  selectProduct(id: number) {
    this.store.dispatch(ProductListViewActions.selectProduct({ id }));
  }

  showUpdateProductModal() {
    this.store.dispatch(ProductListViewActions.showUpdateProductModal());
  }

  showDeleteProductModal() {
    this.store.dispatch(ProductListViewActions.showDeleteProductModal());
  }

  addProduct(product: Product) {
    this.store.dispatch(ProductAddModalActions.addProduct({ product }));
  }

  deleteProduct(product: Product) {
    this.store.dispatch(
      ProductDeleteModalActions.deleteProduct({ product })
    );
  }

  updateProduct(data: { id: number; product: Product }) {
    this.store.dispatch(ProductUpdateModalActions.updateProduct({ data }));
  }

  changePage(page: number) {
    this.store.dispatch(ProductListViewActions.changePage({ page }));
  }
}
