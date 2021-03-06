import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  Input
} from '@angular/core';

import { Product } from '@app/product/models/product';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddComponent {
  @Input() adding = false;
  @Input() categories: ProductCategory[] = [];
  @Output() add = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(product: Product) {
    this.add.emit(product);
  }
}
