import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Product, getPrice } from '@app/product/models/product';
import { ProductCategory } from '@app/product-category/models/product-category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {
  @Input() product = {} as Product;
  @Input() processing = false;
  @Input() categories: ProductCategory[] = [];
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter();

  productForm: FormGroup;
  submitted = false;
  selectedCategories: number[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      price: this.formBuilder.group({
        amount: [getPrice(this.product.priceAmount), Validators.required]
      }),
      categories: this.addCategoriesControl()
    });
  }

  addCategoriesControl() {
    const arr = this.categories.map(category => {
      const hasCategory =
        this.product.categories &&
        this.product.categories.indexOf(category.id) > -1;
      let selected = false;
      if (hasCategory) {
        selected = true;
      }
      return this.formBuilder.control(selected);
    });
    return this.formBuilder.array(arr);
  }

  get categoriesControl(): FormArray {
    return this.productForm.get('categories') as FormArray;
  }

  getSelectedCategories() {
    this.selectedCategories = [];
    this.categoriesControl.controls.map((control, index) => {
      if (control.value) {
        this.selectedCategories.push(this.categories[index].id);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      this.getSelectedCategories();
      const formValue = {
        ...this.productForm.value,
        categories: this.selectedCategories
      };
      this.save.emit(formValue);
    }
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
