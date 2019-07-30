import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromProductCategories from '@app/product-category/state/reducers';
import { ProductCategoryUpdateModalActions } from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-category-update-modal',
  templateUrl: 'product-category-update-modal.component.html'
})
export class ProductCategoryUpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selectedProductCategory$: Observable<ProductCategory>;

  constructor(
    public bsModalRef: BsModalRef,
    public store: Store<fromProductCategories.State>
  ) {}

  ngOnInit() {
    this.selectedProductCategory$ = this.store.pipe(
      select(fromProductCategories.getSelectedProductCategory)
    );
    this.updated$ = this.store.pipe(
      select(fromProductCategories.getProductCategoryEntitiesUpdated)
    );
    this.updating$ = this.store.pipe(
      select(fromProductCategories.getProductCategoryEntitiesUpdating)
    );

    this.subscription = this.updated$
      .pipe(filter(updated => updated))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onUpdate(data: { id: number; productCategory: ProductCategory }) {
    this.store.dispatch(ProductCategoryUpdateModalActions.updateProductCategory({ data }));
  }
}
