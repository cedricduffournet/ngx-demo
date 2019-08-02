import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthFacade } from '@app/authentication/state/auth.facade';

@Component({
  selector: 'app-list-parameters',
  templateUrl: 'list-parameters.component.html'
})
export class ListParametersComponent implements OnInit {
  canViewCivility$: Observable<boolean>;
  canViewProductCategory$: Observable<boolean>;
  canViewProduct$: Observable<boolean>;

  public constructor(private facade: AuthFacade) {}

  ngOnInit() {
    this.canViewCivility$ = this.facade.isAuthorized([
      'ROLE_CIVILITY_CREATE',
      'ROLE_CIVILITY_EDIT',
      'ROLE_CIVILITY_DELETE'
    ]);

    this.canViewProductCategory$ = this.facade.isAuthorized([
      'ROLE_PRODUCT_CATEGORY_CREATE',
      'ROLE_PRODUCT_CATEGORY_EDIT',
      'ROLE_PRODUCT_CATEGORY_DELETE'
    ]);

    this.canViewProduct$ = this.facade.isAuthorized([
      'ROLE_PRODUCT_CREATE',
      'ROLE_PRODUCT_EDIT',
      'ROLE_PRODUCT_DELETE'
    ]);
  }
}
