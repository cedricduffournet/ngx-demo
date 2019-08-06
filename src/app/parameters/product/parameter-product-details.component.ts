import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameter-product-details',
  templateUrl: './parameter-product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParameterProductDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
