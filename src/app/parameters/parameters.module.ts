import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PageInnerModule } from '@app/shared/page-inner/page-inner.module';
import { CivilityModule } from '@app/civility/civility.module';
import { ProductCategoryModule } from '@app/product-category/product-category.module';

import { ListParametersComponent } from '@app/parameters/containers';
import { ParameterCivilityComponent } from '@app/parameters/civility';
import { ParameterProductCategoryComponent } from '@app/parameters/product-category';
import { ReferencedTableMenuComponent } from '@app/parameters/components';

import { routing } from './parameters.routing';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PageInnerModule,
    CivilityModule,
    routing,
    ReactiveFormsModule,
    ProductCategoryModule
  ],
  declarations: [
    ListParametersComponent,
    ReferencedTableMenuComponent,
    ParameterCivilityComponent,
    ParameterProductCategoryComponent
  ]
})
export class ParametersModule {}
