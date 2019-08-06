import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input() page = 0;
  @Input() itemsPerPage = 0;
  @Input() totalItems = 0;
  @Output() pageChanged = new EventEmitter();

  onPageChanged(value: any) {
    this.pageChanged.emit(value.page);
  }
}
