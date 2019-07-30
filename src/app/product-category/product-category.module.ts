import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { ProductCategoryEffects } from '@app/product-category/state/effects';
import {
  ProductCategoryAddComponent,
  ProductCategoryUpdateComponent,
  ProductCategoryDeleteComponent,
  ProductCategoryFormComponent,
  ProductCategoryItemComponent,
  ProductCategoryItemsComponent
} from '@app/product-category/components';
import {
  ProductCategoryAddModalComponent,
  ProductCategoryUpdateModalComponent,
  ProductCategoryDeleteModalComponent,
  ProductCategoryListViewComponent
} from '@app/product-category/containers';
import { reducers } from '@app/product-category/state/reducers';
import { CoalescingComponentFactoryResolver } from '@app/coalescing-component-factory-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    EffectsModule.forFeature([ProductCategoryEffects]),
    StoreModule.forFeature('productCategories', reducers)
  ],
  declarations: [
    ProductCategoryListViewComponent,
    ProductCategoryAddComponent,
    ProductCategoryUpdateComponent,
    ProductCategoryDeleteComponent,
    ProductCategoryFormComponent,
    ProductCategoryItemComponent,
    ProductCategoryItemsComponent,
    ProductCategoryAddModalComponent,
    ProductCategoryUpdateModalComponent,
    ProductCategoryDeleteModalComponent
  ],
  entryComponents: [
    ProductCategoryUpdateModalComponent,
    ProductCategoryAddModalComponent,
    ProductCategoryDeleteModalComponent
  ],
  exports: [ProductCategoryListViewComponent]
})
export class ProductCategoryModule {
  // see https://github.com/angular/angular/issues/14324
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
