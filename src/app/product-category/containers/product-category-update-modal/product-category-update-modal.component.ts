import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ProductCategory } from '@app/product-category/models/product-category';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

@Component({
  selector: 'app-product-category-update-modal',
  templateUrl: 'product-category-update-modal.component.html'
})
export class ProductCategoryUpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selectedProductCategory$: Observable<ProductCategory>;

  constructor(public bsModalRef: BsModalRef, public facade: ProductCategoryFacade) {}

  ngOnInit() {
    this.selectedProductCategory$ = this.facade.selected$;
    this.updated$ = this.facade.updated$;
    this.updating$ = this.facade.updating$;

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
     this.facade.updateProductCategory(data);
  }
}
