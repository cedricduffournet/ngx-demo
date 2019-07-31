import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '@app/product/models/product';
import { User } from '@app/user/models/User';
import { Authorization } from '@app/core/models/authorization.model';
import { ProductListViewActions } from '@app/product/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';
import * as fromProducts from '@app/product/state/reducers';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListViewComponent implements OnInit {
  products$: Observable<Product[]>;
  loggedUser$: Observable<User | null>;
  authorization$: Observable<Authorization>;

  public constructor(
    private store: Store<fromProducts.State & fromAuth.State>
  ) {}

  public ngOnInit() {
    this.products$ = this.store.pipe(select(fromProducts.getProducts));
    this.loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.authorization$ = this.store.pipe(
      select(fromProducts.getProductAuthorization)
    );
    this.store.dispatch(ProductListViewActions.loadProducts());
  }

  onAdd() {
    this.store.dispatch(ProductListViewActions.showAddProductModal());
  }

  onUpdate(id: number) {
    this.store.dispatch(ProductListViewActions.selectProduct({ id }));
    this.store.dispatch(ProductListViewActions.showUpdateProductModal());
  }

  onDelete(id: number): void {
    this.store.dispatch(ProductListViewActions.selectProduct({ id }));
    this.store.dispatch(ProductListViewActions.showDeleteProductModal());
  }
}
