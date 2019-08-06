import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Product } from '@app/product/models/product';
import { ProductFacade } from '@app/product/state/product.facade';
import { ProductCategoryFacade } from '@app/product-category/state/product-category.facade';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-add-view',
  templateUrl: 'product-add-view.component.html'
})
export class ProductAddViewComponent implements OnInit {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  categories$: Observable<ProductCategory[]>;
  loadingCategories$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    private facade: ProductFacade,
    private productCategoryFacade: ProductCategoryFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories$ = this.productCategoryFacade.productCategories$;
    this.loadingCategories$ = this.productCategoryFacade.loading$;
    this.productCategoryFacade.loadProductCategories();
    this.added$ = this.facade.added$;
    this.adding$ = this.facade.adding$;
  }

  onCancel() {
    this.router.navigate(['parameters/products']);
  }

  onAdd(product: Product) {
    this.facade.addProduct(product);
  }
}
