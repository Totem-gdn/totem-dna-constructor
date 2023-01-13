import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PropertiesService } from '@app/core/services/properties.service';
import { PROPERTIES } from '../../../../../core/enums/properties.enum';

@Component({
  selector: 'property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss']
})
export class PropertyTypesComponent implements OnInit {

  constructor(private propertiesService: PropertiesService) {}
  // properties: PropertiesModel[] = [
  //   { title: PROPERTIES.BOOLEAN, value: PROPERTIES_LOWERCASE.BOOLEAN },
  //   { title: PROPERTIES.INTEGER, value: PROPERTIES_LOWERCASE.INTEGER },
  //   { title: PROPERTIES.ENUM, value: PROPERTIES_LOWERCASE.ENUM },
  //   { title: PROPERTIES.RANGE, value: PROPERTIES_LOWERCASE.RANGE },
  //   { title: PROPERTIES.COLOR, value: PROPERTIES_LOWERCASE.COLOR },
  // ]
  properties: PROPERTIES[] = [
    PROPERTIES.BOOLEAN,
    PROPERTIES.INTEGER,
    PROPERTIES.ENUM,
    PROPERTIES.RANGE,
    PROPERTIES.COLOR
  ]

  ngOnInit(): void {
    
  }

  addProperty(type: PROPERTIES): void {
    this.propertiesService.addProperty(type);
    // this.addProperty.emit(asset);
  }

}
