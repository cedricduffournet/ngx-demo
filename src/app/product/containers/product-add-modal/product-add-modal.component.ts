import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromProducts from '@app/product/state/reducers';
import { ProductAddModalActions } from '@app/product/state/actions';
import { Product } from '@app/product/models/product';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: 'product-add-modal.component.html'
})
export class ProductAddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;
  selectedProduct$: Observable<Product>;

  constructor(
    public bsModalRef: BsModalRef,
    private store: Store<fromProducts.State>
  ) {}

  ngOnInit() {
    this.added$ = this.store.pipe(
      select(fromProducts.getProductCollectionAdded)
    );
    this.adding$ = this.store.pipe(
      select(fromProducts.getProductCollectionAdding)
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

  onAdd(product: Product) {
    this.store.dispatch(ProductAddModalActions.addProduct({ product }));
  }
}
