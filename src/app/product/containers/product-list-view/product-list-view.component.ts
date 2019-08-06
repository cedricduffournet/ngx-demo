import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListViewComponent implements OnInit {
  products$: Observable<Product[]>;
  canUpdate$: Observable<boolean>;
  canDelete$: Observable<boolean>;
  canCreate$: Observable<boolean>;
  config$: Observable<any>;
  totalItems$: Observable<number>;

  public constructor(
    private facade: ProductFacade,
    private authFacade: AuthFacade
  ) {}

  public ngOnInit() {
    this.products$ = this.facade.products$;
    this.canCreate$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_CREATE']);
    this.canDelete$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_DELETE']);
    this.canUpdate$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_EDIT']);
    this.config$ = this.facade.config$;
    this.totalItems$ = this.facade.totalItems$;
    this.facade.loadProducts();
  }

  onAdd() {
    this.facade.navigateToAddProduct();
  }

  onUpdate(id: number) {
    this.facade.selectProduct(id);
    this.facade.navigateToSelectedProduct();
  }

  onDelete(id: number): void {
    this.facade.selectProduct(id);
    this.facade.showDeleteProductModal();
  }

  onPageChanged(page: number) {
    this.facade.changePage(page);
  }
}
