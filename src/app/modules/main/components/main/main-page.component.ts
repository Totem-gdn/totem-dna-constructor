import { Component, OnInit } from '@angular/core';
import { PROPERTIES_LOWERCASE } from '../../enums/properties.enum';
import { PropertyModel } from '../../models/property.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  propertyList: PropertyModel[] = []
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  selectTypeEvent(event: string): void {
    console.log('Select type asset', event);

  }

  onDeleteProperty(itemIndex: number): void {
    this.propertyList.splice(itemIndex, 1);
  }

  onSelectProperty(indexSelectedItem: number): void {
    this.propertyList.forEach((item: PropertyModel, index: number) => {
      item.active = index === indexSelectedItem ? true : false
    })
  }

  selectTypePropertyEvent(type: PROPERTIES_LOWERCASE): void {
    this.propertyList.forEach((elem: PropertyModel) => {
      elem.active = false;
    })
    const objectTemp = {
      ...this.dataService.defaultTypesObject[type],
      active: true,
    };
    this.propertyList.push(objectTemp)
  }

}
