import {
  Input,
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Self,
  Optional
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() helpText = '';
  @Input() showError = false;
  @Input() placeholder = '';
  @Input() errorText = '';
  @Input() formGroupClass = '';
  @Input() rows = 5;
  @Input() cols = 5;
  @Input() submitted = false;

  isDisabled = false;
  onTouched = Function.prototype;
  onChange = Function.prototype;
  value = '';

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }

  get isInvalid(): boolean {
    return (
      ((this.ngControl.invalid as boolean) && this.submitted) || this.showError
    );
  }

  get showNativeErrors(): boolean {
    return (
      this.isInvalid && this.ngControl.errors !== null && this.errorText === ''
    );
  }

  get showErrorRequired(): boolean {
    return (
      this.showNativeErrors &&
      (this.ngControl.errors as ValidationErrors).required
    );
  }
}
