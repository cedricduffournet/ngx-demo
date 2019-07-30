import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  Input
} from '@angular/core';

import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-category-add',
  templateUrl: './product-category-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryAddComponent {
  @Input() adding = false;
  @Output() add = new EventEmitter<ProductCategory>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(productCategory: ProductCategory) {
    this.add.emit(productCategory);
  }
}
