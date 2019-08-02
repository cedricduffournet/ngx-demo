import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorComponent } from '@app/shared/paginator/paginator.component';

@NgModule({
  imports: [FormsModule, CommonModule, TranslateModule, PaginationModule],
  exports: [PaginatorComponent],
  declarations: [PaginatorComponent]
})
export class PaginatorModule {}
