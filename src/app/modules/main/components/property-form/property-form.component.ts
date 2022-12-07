import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyFormComponent implements OnInit {
  @Input() property?: PropertyModel;
  constructor() { }

  ngOnInit(): void {
  }

}
