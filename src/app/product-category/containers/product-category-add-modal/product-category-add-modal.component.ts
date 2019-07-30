import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromProductCategories from '@app/product-category/state/reducers';
import { ProductCategoryAddModalActions } from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-category-add-modal',
  templateUrl: 'product-category-add-modal.component.html'
})
export class ProductCategoryAddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;
  selectedProductCategory$: Observable<ProductCategory>;

  constructor(
    public bsModalRef: BsModalRef,
    private store: Store<fromProductCategories.State>
  ) {}

  ngOnInit() {
    this.added$ = this.store.pipe(
      select(fromProductCategories.getProductCategoryCollectionAdded)
    );
    this.adding$ = this.store.pipe(
      select(fromProductCategories.getProductCategoryCollectionAdding)
    );

    this.subscription = this.added$
      .pipe(filter(added => added))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onAdd(productCategory: ProductCategory) {
    this.store.dispatch(ProductCategoryAddModalActions.addProductCategory({ productCategory }));
  }
}
