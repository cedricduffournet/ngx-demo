import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ProductCategory } from '@app/product-category/models/product-category';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  selector: 'app-product-category-items',
  templateUrl: './product-category-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryItemsComponent {
  @Input() productCategories: ProductCategory[];
  @Input() authorization: Authorization;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  @Output() add = new EventEmitter<string>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onUpdate(id: number) {
    this.update.emit(id);
  }

  onAdd() {
    this.add.emit('add');
  }

  trackById(index: number, item: ProductCategory) {
    return item.id;
  }
}
