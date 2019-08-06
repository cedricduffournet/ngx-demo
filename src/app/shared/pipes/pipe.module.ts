import { NgModule } from '@angular/core';

import { Nl2brPipe } from '@app/shared/pipes/nl2br.pipe';

export const PIPES = [Nl2brPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {}
