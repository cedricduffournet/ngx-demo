import { RouterModule, Routes } from '@angular/router';
import { ListParametersComponent } from '@app/parameters/containers';
import { ParameterCivilityComponent } from '@app/parameters/civility';
import { ParameterProductCategoryComponent } from '@app/parameters/product-category';
import {
  ParameterProductComponent,
  ParameterProductAddComponent,
  ParameterProductDetailsComponent
} from '@app/parameters/product';
import { AuthGuard } from '@app/authentication/services';
import { ProductGuard } from '@app/product/services/product.guard';

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
  },
  {
    path: 'products',
    component: ParameterProductComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_PRODUCT_CREATE',
        'ROLE_PRODUCT_EDIT',
        'ROLE_PRODUCT_DELETE'
      ],
      title: 'PRODUCTS',
      previousLink: ['parameters']
    }
  },
  {
    path: 'products/new',
    component: ParameterProductAddComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PRODUCT_CREATE'],
      title: 'PRODUCTS',
      previousLink: ['parameters/products']
    }
  },
  {
    path: 'products/:id',
    component: ParameterProductDetailsComponent,
    canActivate: [AuthGuard, ProductGuard],
    data: {
      roles: ['ROLE_PRODUCT_EDIT'],
      title: 'PRODUCTS',
      previousLink: ['parameters/products']
    }
  }
];
export const routing = RouterModule.forChild(routes);
