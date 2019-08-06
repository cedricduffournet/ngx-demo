import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { TextInputComponent } from '@app/shared/form/text-input';
import { TextAreaComponent } from '@app/shared/form/text-area';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  exports: [TextInputComponent, TextAreaComponent],
  declarations: [TextInputComponent, TextAreaComponent]
})
export class FormModule {}
