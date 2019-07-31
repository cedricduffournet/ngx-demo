import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromProducts from '@app/product/state/reducers';
import { ProductDeleteModalActions } from '@app/product/state/actions';
import { Product } from '@app/product/models/product';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: 'product-delete-modal.component.html'
})
export class ProductDeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
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
    this.deleted$ = this.store.pipe(
      select(fromProducts.getProductCollectionDeleted)
    );
    this.deleting$ = this.store.pipe(
      select(fromProducts.getProductCollectionDeleting)
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

  onDelete(product: Product) {
    this.store.dispatch(
      ProductDeleteModalActions.deleteProduct({ product })
    );
  }
}
