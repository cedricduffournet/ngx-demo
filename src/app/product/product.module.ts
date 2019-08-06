import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { PipesModule } from '@app/shared/pipes/pipe.module';

import { ProductCategoryModule } from '@app/product-category/product-category.module';
import { ProductEffects } from '@app/product/state/effects';
import { ProductFacade } from '@app/product/state/product.facade';
import {
  ProductAddComponent,
  ProductUpdateComponent,
  ProductDeleteComponent,
  ProductFormComponent,
  ProductItemComponent,
  ProductItemsComponent,
  ProductDetailsComponent
} from '@app/product/components';
import {
  ProductAddViewComponent,
  ProductUpdateModalComponent,
  ProductDeleteModalComponent,
  ProductListViewComponent,
  ProductSelectedComponent,
  ProductDetailsViewComponent
} from '@app/product/containers';
import { reducers } from '@app/product/state/reducers';
import { ProductGuard } from '@app/product/services/product.guard';
import { CoalescingComponentFactoryResolver } from '@app/coalescing-component-factory-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    PipesModule,
    ProductCategoryModule,
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature('products', reducers)
  ],
  declarations: [
    ProductListViewComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    ProductFormComponent,
    ProductItemComponent,
    ProductItemsComponent,
    ProductAddViewComponent,
    ProductUpdateModalComponent,
    ProductDeleteModalComponent,
    ProductDetailsComponent,
    ProductSelectedComponent,
    ProductDetailsViewComponent
  ],
  entryComponents: [
    ProductUpdateModalComponent,
    ProductDeleteModalComponent
  ],
  exports: [ProductListViewComponent, ProductAddViewComponent, ProductDetailsViewComponent],
  providers: [ProductFacade, ProductGuard]
})
export class ProductModule {
  // see https://github.com/angular/angular/issues/14324
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
