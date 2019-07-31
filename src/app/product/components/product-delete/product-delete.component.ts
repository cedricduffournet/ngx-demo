import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { Product } from '@app/product/models/product';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDeleteComponent {
  @Input() product: Product;
  @Input() deleting = false;
  @Output() delete = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<string>();

  onDelete(product: Product) {
    this.delete.emit(product);
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
