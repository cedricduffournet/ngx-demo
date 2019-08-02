import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: 'product-add-modal.component.html'
})
export class ProductAddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private facade: ProductFacade
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

  onAdd(product: Product) {
    this.facade.addProduct(product);
  }
}
