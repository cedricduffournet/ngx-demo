import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  OnDestroy,
  Input
} from '@angular/core';

import { Product } from '@app/product/models/product';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductUpdateComponent {
  @Input() product: Product;
  @Input() updating = false;
  @Input() categories: ProductCategory[] = [];
  @Output() update = new EventEmitter<{
    id: number;
    product: Product;
  }>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(product: Product) {
    const id = this.product.id;
    this.update.emit({
      id,
      product
    });
  }
}
