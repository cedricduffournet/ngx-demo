import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  ProductListViewActions,
  ProductAddModalActions,
  ProductDeleteModalActions,
  ProductUpdateModalActions,
  ProductActions
} from '@app/product/state/actions';
import * as fromRoot from '@app/core/state/reducers';
import * as fromProducts from '@app/product/state/reducers';
import { Product } from '@app/product/models/product';

@Injectable()
export class ProductFacade {
  products$ = this.store.pipe(select(fromProducts.getProducts));
  added$ = this.store.pipe(select(fromProducts.getProductCollectionAdded));
  adding$ = this.store.pipe(select(fromProducts.getProductCollectionAdding));
  updated$ = this.store.pipe(select(fromProducts.getProductEntitiesUpdated));
  updating$ = this.store.pipe(select(fromProducts.getProductEntitiesUpdating));
  deleted$ = this.store.pipe(select(fromProducts.getProductCollectionDeleted));
  deleting$ = this.store.pipe(
    select(fromProducts.getProductCollectionDeleting)
  );
  selected$ = this.store.pipe(select(fromProducts.getSelectedProduct));
  selectedDenormalized$ = this.store.pipe(select(fromProducts.getSelectedProductDenormalized));
  selectedId$ = this.store.pipe(select(fromProducts.getSelectedProductId));
  totalItems$ = this.store.pipe(
    select(fromProducts.getProductCollectionTotalItems)
  );
  config$ = this.store.pipe(select(fromProducts.getProductCollectionConfig));

  constructor(private store: Store<any >) {}

  loadProducts() {
    this.store.dispatch(ProductListViewActions.loadProducts());
  }

  navigateToAddProduct() {
    this.store.dispatch(ProductListViewActions.navigateToAddProduct());
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
    this.store.dispatch(ProductDeleteModalActions.deleteProduct({ product }));
  }

  updateProduct(data: { id: number; product: Product }) {
    this.store.dispatch(ProductUpdateModalActions.updateProduct({ data }));
  }

  changePage(page: number) {
    this.store.dispatch(ProductListViewActions.changePage({ page }));
  }

  navigateToSelectedProduct() {
    this.store.dispatch(ProductListViewActions.navigateToSelectedProduct());
  }
}
