import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { ProductCategory } from '@app/product-category/models/product-category';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[appProductCategoryItem]',
  templateUrl: './product-category-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryItemComponent {
  @Input() productCategory: ProductCategory;
  @Input() authorization: Authorization;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onUpdate(id: number) {
    this.update.emit(id);
  }
}
