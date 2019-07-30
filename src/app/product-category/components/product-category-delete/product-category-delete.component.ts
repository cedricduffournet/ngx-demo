import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-category-delete',
  templateUrl: './product-category-delete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryDeleteComponent {
  @Input() productCategory: ProductCategory;
  @Input() deleting = false;
  @Output() delete = new EventEmitter<ProductCategory>();
  @Output() cancel = new EventEmitter<string>();

  onDelete(productCategory: ProductCategory) {
    this.delete.emit(productCategory);
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
