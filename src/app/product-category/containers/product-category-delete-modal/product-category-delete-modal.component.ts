import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ProductCategory } from '@app/product-category/models/product-category';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

@Component({
  selector: 'app-product-category-delete-modal',
  templateUrl: 'product-category-delete-modal.component.html'
})
export class ProductCategoryDeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
  subscription: Subscription;
  selectedProductCategory$: Observable<ProductCategory>;

  constructor(public bsModalRef: BsModalRef, public facade: ProductCategoryFacade) {}

  ngOnInit() {
    this.selectedProductCategory$ = this.facade.selected$;
    this.deleted$ = this.facade.deleted$;
    this.deleting$ = this.facade.deleting$;

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
    this.facade.deleteProductCategory(productCategory);
  }
}
