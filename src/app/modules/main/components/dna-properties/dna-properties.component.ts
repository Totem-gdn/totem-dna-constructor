import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PROPERTIES, PROPERTIES_LOWERCASE } from '../../enums/properties.enum';
import { PropertiesModel } from '../../models/properties.model';

@Component({
  selector: 'dna-properties',
  templateUrl: './dna-properties.component.html',
  styleUrls: ['./dna-properties.component.scss']
})
export class DNAPropertiesComponent implements OnInit {
  properties: PropertiesModel[] = [
    { title: PROPERTIES.BOOLEAN, value: PROPERTIES_LOWERCASE.BOOLEAN },
    { title: PROPERTIES.INTEGER, value: PROPERTIES_LOWERCASE.INTEGER },
    { title: PROPERTIES.ENUM, value: PROPERTIES_LOWERCASE.ENUM },
    { title: PROPERTIES.RANGE, value: PROPERTIES_LOWERCASE.RANGE },
    { title: PROPERTIES.COLOR, value: PROPERTIES_LOWERCASE.COLOR },
  ]

  @Output() addNewPropertyEvent: EventEmitter<PROPERTIES_LOWERCASE> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectProperty(asset: PropertiesModel): void {
    this.addNewPropertyEvent.emit(asset.value as PROPERTIES_LOWERCASE);
  }

}
