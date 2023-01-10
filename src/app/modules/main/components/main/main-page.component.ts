import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PROPERTIES } from '../../../../core/enums/properties.enum';
import { PropertyModel } from '../../../../core/models/property.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  propertyList: PropertyModel[] = [
    // { description: "some description", id: "some ID", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: 3, offset: 6, length: 5, active: false },
    // { description: "some description", id: "some ID", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: 3, offset: 6, length: 5, active: true },
    // { description: "some description", id: "some ID", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: 3, offset: 6, length: 5, active: false },
  ];
  selectedProperty?: PropertyModel;
  indexSelectedProperty!: number;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  selectTypeAssetEvent(event: string): void {

  }

  updatePropertyInJson(property: PropertyModel): void {
    const index: number = this.indexSelectedProperty >= 0 ? this.indexSelectedProperty : this.propertyList.length - 1;

    let key: keyof PropertyModel;
    for (key in property) {
      (this.propertyList[index][key] as any) = property[key];
    }
    this.toastr.success('Property is updated')
  }

  onDeleteProperty(event: { item: PropertyModel, index: number }): void {
    this.propertyList.splice(event.index, 1);
    // if (event.item.active) {
    //   this.selectedProperty = undefined;
    // }
  }

  onSelectProperty(indexSelectedItem: number): void {
    this.propertyList.forEach((item: PropertyModel, index: number) => {
      if (index === indexSelectedItem) {
        this.selectedProperty = item;
        this.indexSelectedProperty = indexSelectedItem;
        // item.active = true;
      } else {
        // item.active = false;
      }
    })
  }

  // addProperty(type: PROPERTIES): void {
  //   // this.propertyList.forEach((elem: PropertyModel) => {
  //   //   elem.active = false;
  //   // })
  //   // this.propertyList.forEach((elem: PropertyModel) => {
  //   //   elem.active = false;
  //   // })
  //   const newProperty: PropertyModel = {
  //     ...this.defau.defaultTypesObject[type],
  //     active: true,
  //     description: `Untitled ${this.propertyList.length + 1}`,
  //   };
  //   this.propertyList.push(newProperty);
  //   this.indexSelectedProperty = this.propertyList.length - 1
  //   this.selectedProperty = newProperty;
  // }

}
