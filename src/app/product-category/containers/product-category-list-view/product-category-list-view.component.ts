import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProductCategory } from '@app/product-category/models/product-category';
import { User } from '@app/user/models/User';
import { Authorization } from '@app/core/models/authorization.model';
import { ProductCategoryListViewActions } from '@app/product-category/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';
import * as fromProductCategories from '@app/product-category/state/reducers';

@Component({
  selector: 'app-product-category-list-view',
  templateUrl: './product-category-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryListViewComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]>;
  loggedUser$: Observable<User | null>;
  authorization$: Observable<Authorization>;

  public constructor(
    private store: Store<fromProductCategories.State & fromAuth.State>
  ) {}

  public ngOnInit() {
    this.productCategories$ = this.store.pipe(select(fromProductCategories.getProductCategories));
    this.loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.authorization$ = this.store.pipe(
      select(fromProductCategories.getProductCategoryAuthorization)
    );
    this.store.dispatch(ProductCategoryListViewActions.loadProductCategories());
  }

  onAdd() {
    this.store.dispatch(ProductCategoryListViewActions.showAddProductCategoryModal());
  }

  onUpdate(id: number) {
    this.store.dispatch(ProductCategoryListViewActions.selectProductCategory({ id }));
    this.store.dispatch(ProductCategoryListViewActions.showUpdateProductCategoryModal());
  }

  onDelete(id: number): void {
    this.store.dispatch(ProductCategoryListViewActions.selectProductCategory({ id }));
    this.store.dispatch(ProductCategoryListViewActions.showDeleteProductCategoryModal());
  }
}
