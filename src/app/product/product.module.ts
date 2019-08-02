import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { ProductEffects } from '@app/product/state/effects';
import { ProductFacade } from '@app/product/state/product.facade';
import {
  ProductAddComponent,
  ProductUpdateComponent,
  ProductDeleteComponent,
  ProductFormComponent,
  ProductItemComponent,
  ProductItemsComponent
} from '@app/product/components';
import {
  ProductAddModalComponent,
  ProductUpdateModalComponent,
  ProductDeleteModalComponent,
  ProductListViewComponent
} from '@app/product/containers';
import { reducers } from '@app/product/state/reducers';
import { CoalescingComponentFactoryResolver } from '@app/coalescing-component-factory-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
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
    ProductAddModalComponent,
    ProductUpdateModalComponent,
    ProductDeleteModalComponent
  ],
  entryComponents: [
    ProductUpdateModalComponent,
    ProductAddModalComponent,
    ProductDeleteModalComponent
  ],
  exports: [ProductListViewComponent],
  providers: [ProductFacade]
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
