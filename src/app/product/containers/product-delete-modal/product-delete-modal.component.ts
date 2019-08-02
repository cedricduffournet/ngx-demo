import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: 'product-delete-modal.component.html'
})
export class ProductDeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
  subscription: Subscription;
  selectedProduct$: Observable<Product>;

  constructor(public bsModalRef: BsModalRef, public facade: ProductFacade) {}

  ngOnInit() {
    this.selectedProduct$ = this.facade.selected$;
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

  onDelete(product: Product) {
    this.facade.deleteProduct(product);
  }
}
