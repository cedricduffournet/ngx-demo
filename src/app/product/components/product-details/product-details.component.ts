import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { ProductFull } from '@app/product/models/product';
import { Authorization } from '@app/core/models/authorization.model';
import { environment } from '@env/environment';

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

  apiHost = environment.apiHost;

  onDelete() {
    this.delete.emit();
  }

  onUpdate() {
    this.update.emit();
  }

  get image() {
    if (this.product.images.length) {
      const index = this.product.images.length - 1;
      const lastImage = this.product.images[index];
      return `${this.apiHost}/public/products/images/${lastImage.id}?size=main_image`;
    }
  }
}
