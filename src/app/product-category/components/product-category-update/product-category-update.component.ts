import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  OnDestroy,
  Input
} from '@angular/core';

import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-category-update',
  templateUrl: './product-category-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryUpdateComponent {
  @Input() productCategory: ProductCategory;
  @Input() updating = false;
  @Output() update = new EventEmitter<{
    id: number;
    productCategory: ProductCategory;
  }>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(productCategory: ProductCategory) {
    const id = this.productCategory.id;
    this.update.emit({
      id,
      productCategory
    });
  }
}
