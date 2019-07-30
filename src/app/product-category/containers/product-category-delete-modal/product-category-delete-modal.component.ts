import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromProductCategories from '@app/product-category/state/reducers';
import { ProductCategoryDeleteModalActions } from '@app/product-category/state/actions';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-category-delete-modal',
  templateUrl: 'product-category-delete-modal.component.html'
})
export class ProductCategoryDeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
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
    this.deleted$ = this.store.pipe(
      select(fromProductCategories.getProductCategoryCollectionDeleted)
    );
    this.deleting$ = this.store.pipe(
      select(fromProductCategories.getProductCategoryCollectionDeleting)
    );

    this.subscription = this.deleted$
      .pipe(filter(deleted => deleted))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onDelete(productCategory: ProductCategory) {
    this.store.dispatch(
      ProductCategoryDeleteModalActions.deleteProductCategory({ productCategory })
    );
  }
}
