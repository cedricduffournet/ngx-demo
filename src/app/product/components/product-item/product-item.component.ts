import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Product } from '@app/product/models/product';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[appProductItem]',
  templateUrl: './product-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {
  @Input() product: Product;
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
