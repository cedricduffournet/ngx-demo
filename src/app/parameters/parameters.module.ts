import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PageInnerModule } from '@app/shared/page-inner/page-inner.module';
import { CivilityModule } from '@app/civility/civility.module';
import { ProductCategoryModule } from '@app/product-category/product-category.module';
import { ProductModule } from '@app/product/product.module';

import { ListParametersComponent } from '@app/parameters/containers';
import { ReferencedTableMenuComponent } from '@app/parameters/components';
import { ParameterCivilityComponent } from '@app/parameters/civility';
import { ParameterProductCategoryComponent } from '@app/parameters/product-category';
import { ParameterProductComponent, ParameterProductDetailsComponent, ParameterProductAddComponent } from '@app/parameters/product';

import { routing } from './parameters.routing';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PageInnerModule,
    CivilityModule,
    routing,
    ReactiveFormsModule,
    ProductCategoryModule,
    ProductModule
  ],
  declarations: [
    ListParametersComponent,
    ReferencedTableMenuComponent,
    ParameterCivilityComponent,
    ParameterProductCategoryComponent,
    ParameterProductComponent,
    ParameterProductDetailsComponent,
    ParameterProductAddComponent
  ]
})
export class ParametersModule {}
