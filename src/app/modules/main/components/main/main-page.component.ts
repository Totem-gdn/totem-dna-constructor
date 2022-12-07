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
  propertyList: PropertyModel[] = [];
  selectedProperty?: PropertyModel;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  selectTypeAssetEvent(event: string): void {
    console.log('Select type asset', event);

  }

  onDeleteProperty(event: { item: PropertyModel, index: number }): void {
    this.propertyList.splice(event.index, 1);
    if (event.item.active) {
      this.selectedProperty = undefined;
    }

  }

  onSelectProperty(indexSelectedItem: number): void {
    this.propertyList.forEach((item: PropertyModel, index: number) => {
      if (index === indexSelectedItem) {
        this.selectedProperty = item;
        item.active = true;
      } else {
        item.active = false;
      }
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
    this.propertyList.push(objectTemp);
    this.selectedProperty = objectTemp;
  }

}
