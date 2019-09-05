import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FileUploadEffects } from '@app/file-upload/state/effects';
import { reducers } from '@app/file-upload/state/reducers';
import { FileUploadComponent } from '@app/file-upload/containers';

@NgModule({
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('fileUpload', reducers),
    EffectsModule.forFeature([FileUploadEffects])
  ]
})
export class FileUploadModule {}
