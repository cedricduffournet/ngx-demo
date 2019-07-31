import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '@app/product/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {
  @Input() product = {} as Product;
  @Input() processing = false;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter();

  productForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value);
    }
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
