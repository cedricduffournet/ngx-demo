import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductDetailsActions } from '@app/product/state/actions';
import * as fromProducts from '@app/product/state/reducers';

@Component({
  selector: 'app-product-details-view',
  templateUrl: 'product-details-view.component.html'
})
export class ProductDetailsViewComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromProducts.State>
  ) {}

  ngOnInit() {
    this.subscription = this.route.params
      .pipe(
        map(params => ProductDetailsActions.selectProduct({ id: params.id }))
      )
      .subscribe(action => this.store.dispatch(action));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
