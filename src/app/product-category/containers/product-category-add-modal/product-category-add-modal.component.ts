import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ProductCategory } from '@app/product-category/models/product-category';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

@Component({
  selector: 'app-product-category-add-modal',
  templateUrl: 'product-category-add-modal.component.html'
})
export class ProductCategoryAddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private facade: ProductCategoryFacade
  ) {}

  ngOnInit() {
    this.added$ = this.facade.added$;
    this.adding$ = this.facade.adding$;

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
    this.facade.addProductCategory(productCategory);
  }
}
