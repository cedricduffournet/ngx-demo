import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameter-product',
  templateUrl: './parameter-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParameterProductComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
