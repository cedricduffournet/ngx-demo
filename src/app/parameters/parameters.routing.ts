import { RouterModule, Routes } from '@angular/router';
import { ListParametersComponent } from '@app/parameters/containers';
import { ParameterCivilityComponent } from '@app/parameters/civility';
import { ParameterProductCategoryComponent } from '@app/parameters/product-category';
import { AuthGuard } from '@app/authentication/services';

export const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: ListParametersComponent,
    data: { title: 'PARAMETERS' }
  },
  {
    path: 'civilities',
    component: ParameterCivilityComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_CIVILITY_CREATE',
        'ROLE_CIVILITY_EDIT',
        'ROLE_CIVILITY_DELETE'
      ],
      title: 'CIVILITIES',
      previousLink: ['parameters']
    }
  },
  {
    path: 'productcategories',
    component: ParameterProductCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_PRODUCT_CATEGORY_CREATE',
        'ROLE_PRODUCT_CATEGORY_EDIT',
        'ROLE_PRODUCT_CATEGORY_DELETE'
      ],
      title: 'PRODUCT_CATEGORIES',
      previousLink: ['parameters']
    }
  }
];
export const routing = RouterModule.forChild(routes);
