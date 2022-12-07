import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PROPERTIES, PROPERTIES_LOWERCASE } from '../../enums/properties.enum';
import { PropertiesModel } from '../../models/properties.model';

@Component({
  selector: 'app-properties-collection',
  templateUrl: './properties-collection.component.html',
  styleUrls: ['./properties-collection.component.scss']
})
export class PropertiesCollectionComponent implements OnInit {
  properties: PropertiesModel[] = [
    { title: PROPERTIES.BOOLEAN, value: PROPERTIES_LOWERCASE.BOOLEAN },
    { title: PROPERTIES.INTEGER, value: PROPERTIES_LOWERCASE.INTEGER },
    { title: PROPERTIES.ENUM, value: PROPERTIES_LOWERCASE.ENUM },
    { title: PROPERTIES.RANGE, value: PROPERTIES_LOWERCASE.RANGE },
    { title: PROPERTIES.COLOR, value: PROPERTIES_LOWERCASE.COLOR },
  ]

  @Output() selectPropertyEvent: EventEmitter<PROPERTIES_LOWERCASE> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectProperty(asset: PropertiesModel): void {
    this.selectPropertyEvent.emit(asset.value as PROPERTIES_LOWERCASE);
  }

}
