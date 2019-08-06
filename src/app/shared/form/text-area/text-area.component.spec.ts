import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  async,
  tick
} from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@app/shared/form';
import { validateEmail, validatePassword } from '@app/shared/validators';

@Component({
  template: `
    <app-text-area
      [helpText]="helpText"
      [label]="label"
      [showError]="showError"
      [placeholder]="placeholder"
      [errorText]="errorText"
      [formGroupClass]="formGroupClass"
      [formControl]="controlTest"
      [submitted]="submitted"
    ></app-text-area>
  `
})
export class TextInputTestComponent {
  label = '';
  helpText = '';
  showError = false;
  placeholder = '';
  errorText = '';
  formGroupClass = '';
  submitted = false;
  controlTest: FormControl = new FormControl();
}

describe('TextAreaComponent', () => {
  let fixture: ComponentFixture<TextInputTestComponent>;
  let component: TextInputTestComponent;
  let inputElement: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormModule, ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [TextInputTestComponent]
    });

    fixture = TestBed.createComponent(TextInputTestComponent);
    component = fixture.componentInstance;
    inputElement = fixture.nativeElement.querySelector('textarea');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should init form controle with text', () => {
    component.controlTest = new FormControl('this is my text');

    fixture.detectChanges();

    expect(inputElement.value).toEqual('this is my text');
  });

  it('should get new value when subscribe to valueChanges', async(() => {
    component.controlTest = new FormControl();

    fixture.detectChanges();
    component.controlTest.valueChanges.subscribe((value: string) => {
      expect(value).toBe('new value');
    });

    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));
  }));

  it('input should be disabled', () => {
    component.controlTest = new FormControl({ value: '', disabled: true });

    fixture.detectChanges();

    expect(inputElement.disabled).toBeTruthy();
  });

  it('input should display required error message', () => {
    component.controlTest = new FormControl('', Validators.required);
    component.submitted = true;

    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.error-required');
    expect(error).toBeTruthy();
  });


  it('input should display custom error', () => {
    component.showError = true;
    component.errorText = 'Error';

    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.custom-error');
    expect(error).toBeTruthy();
  });

  it('input should should have placeholder', () => {
    component.placeholder = 'placeholder';
    fixture.detectChanges();
    expect(inputElement.placeholder).toBe('placeholder');
  });
});
