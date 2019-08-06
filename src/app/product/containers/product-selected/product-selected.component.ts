import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductFull } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

@Component({
  selector: 'app-product-selected',
  templateUrl: 'product-selected.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSelectedComponent implements OnInit {
  productFull$: Observable<ProductFull>;
  canUpdate$: Observable<boolean>;
  canDelete$: Observable<boolean>;

  constructor(private facade: ProductFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    this.productFull$ = this.facade.selectedDenormalized$;
    this.canDelete$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_DELETE']);
    this.canUpdate$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_EDIT']);
  }

  onUpdate() {
    this.facade.showUpdateProductModal();
  }

  onDelete() {
    this.facade.showDeleteProductModal();
  }
}
