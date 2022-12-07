import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  @Input() propertyList?: PropertyModel[];
  @Output() onDeleteProperty: EventEmitter<number> = new EventEmitter()
  @Output() onSelectProperty: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  ondelete(index: number): void {
    this.onDeleteProperty.emit(index);
  }
  onSelect(index: number): void {
    this.onSelectProperty.emit(index);
  }

}
