import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Product } from '@app/product/models/product';
import { ProductCategory } from '@app/product-category/models/product-category';
import { ProductFacade } from '@app/product/state/product.facade';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';

@Component({
  selector: 'app-product-update-modal',
  templateUrl: 'product-update-modal.component.html'
})
export class ProductUpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selectedProduct$: Observable<Product>;
  categories$: Observable<ProductCategory[]>;
  loadingCategories$: Observable<boolean>;

  constructor(
    public bsModalRef: BsModalRef,
    public facade: ProductFacade,
    private productCategoryFacade: ProductCategoryFacade
  ) {}

  ngOnInit() {
    this.categories$ = this.productCategoryFacade.productCategories$;
    this.loadingCategories$ = this.productCategoryFacade.loading$;
    this.productCategoryFacade.loadProductCategories();
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
