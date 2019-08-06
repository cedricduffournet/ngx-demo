import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductCategory } from '@app/product-category/models/product-category';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

@Component({
  selector: 'app-product-category-list-view',
  templateUrl: './product-category-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryListViewComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]>;
  canUpdate$: Observable<boolean>;
  canDelete$: Observable<boolean>;
  canCreate$: Observable<boolean>;

  public constructor(
    private facade: ProductCategoryFacade,
    private authFacade: AuthFacade
  ) {}

  public ngOnInit() {
    this.productCategories$ = this.facade.productCategories$;
    this.canCreate$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_CATEGORY_CREATE']);
    this.canDelete$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_CATEGORY_DELETE']);
    this.canUpdate$ = this.authFacade.isAuthorized(['ROLE_PRODUCT_CATEGORY_EDIT']);
    this.facade.loadProductCategories();
  }

  onAdd() {
    this.facade.showAddProductCategoryModal();
  }

  onUpdate(id: number) {
    this.facade.selectProductCategory(id);
    this.facade.showUpdateProductCategoryModal();
  }

  onDelete(id: number): void {
    this.facade.selectProductCategory(id);
    this.facade.showDeleteProductCategoryModal();
  }

}
