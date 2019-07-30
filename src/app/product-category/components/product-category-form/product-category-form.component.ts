import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryFormComponent implements OnInit {
  @Input() productCategory = {} as ProductCategory;
  @Input() processing = false;
  @Output() save = new EventEmitter<ProductCategory>();
  @Output() cancel = new EventEmitter();

  productCategoryForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.productCategoryForm = this.formBuilder.group({
      name: [this.productCategory.name, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.productCategoryForm.valid) {
      this.save.emit(this.productCategoryForm.value);
    }
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
