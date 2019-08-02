import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';

@Component({
  selector: 'app-product-update-modal',
  templateUrl: 'product-update-modal.component.html'
})
export class ProductUpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selectedProduct$: Observable<Product>;

  constructor(public bsModalRef: BsModalRef, public facade: ProductFacade) {}

  ngOnInit() {
    this.selectedProduct$ = this.facade.selected$;
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

  onUpdate(data: { id: number; product: Product }) {
     this.facade.updateProduct(data);
  }
}
