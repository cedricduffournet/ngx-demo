import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Product } from '@app/product/models/product';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemsComponent {
  @Input() products: Product[];
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

  trackById(index: number, item: Product) {
    return item.id;
  }
}
