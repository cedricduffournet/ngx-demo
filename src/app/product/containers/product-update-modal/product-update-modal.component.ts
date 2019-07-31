import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromProducts from '@app/product/state/reducers';
import { ProductUpdateModalActions } from '@app/product/state/actions';
import { Product } from '@app/product/models/product';

@Component({
  selector: 'app-product-update-modal',
  templateUrl: 'product-update-modal.component.html'
})
export class ProductUpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selectedProduct$: Observable<Product>;

  constructor(
    public bsModalRef: BsModalRef,
    public store: Store<fromProducts.State>
  ) {}

  ngOnInit() {
    this.selectedProduct$ = this.store.pipe(
      select(fromProducts.getSelectedProduct)
    );
    this.updated$ = this.store.pipe(
      select(fromProducts.getProductEntitiesUpdated)
    );
    this.updating$ = this.store.pipe(
      select(fromProducts.getProductEntitiesUpdating)
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

  onUpdate(data: { id: number; product: Product }) {
    this.store.dispatch(ProductUpdateModalActions.updateProduct({ data }));
  }
}
