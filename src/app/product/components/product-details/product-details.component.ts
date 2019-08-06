import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { ProductFull } from '@app/product/models/product';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  @Input() product: ProductFull;
  @Input() authorization: Authorization;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  onDelete() {
    this.delete.emit();
  }

  onUpdate() {
    this.update.emit();
  }
}
