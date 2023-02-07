import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { ListService } from '@app/core/services/list.service';
import { PROPERTIES } from '../../../core/enums/properties.enum';
import { PropertyModel } from '../../../core/models/property.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    Animations.animations
  ]
})
export class MainPageComponent implements OnInit {
  propertyList: PropertyModel[] = [
    // { description: "some description", id: "some ID", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: 3, offset: 6, length: 5, active: false },
    // { description: "some description", id: "some ID", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: 3, offset: 6, length: 5, active: true },
    // { description: "some description", id: "some ID", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: 3, offset: 6, length: 5, active: false },
  ];
  selectedProperty?: PropertyModel;
  indexSelectedProperty!: number;

  get showGenes() {
    // if(this.listService.showGenes == true) {
    //   document.body.style.position = 'fixed';
    // } else {
    //   document.body.style.position = 'flex';
    // }
    return this.listService.showGenes;
  }
  set showGenes(show: boolean) { this.listService.showGenes = show }
  mode: 'large' | 'medium' | 'small' = 'large';

  constructor(
    private dataService: DataService,
    public breakpointObserver: BreakpointObserver,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 600px)', '(max-width: 1024px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 600px)'] == true) {
          this.showGenes = true;
          this.mode = 'small';
        } else if (state.breakpoints['(max-width: 1024px)'] == true) {
          this.mode = 'medium';
        } else {
          this.mode = 'large';
        }
      });
  }

  selectTypeAssetEvent(event: string): void {

  }

  updatePropertyInJson(property: PropertyModel): void {
    const index: number = this.indexSelectedProperty >= 0 ? this.indexSelectedProperty : this.propertyList.length - 1;

    let key: keyof PropertyModel;
    for (key in property) {
      (this.propertyList[index][key] as any) = property[key];
    }
    // this.toastr.success('Property is updated')
  }

  // onDeleteProperty(event: { item: PropertyModel, index: number }): void {
  //   this.propertyList.splice(event.index, 1);
  //   // if (event.item.active) {
  //   //   this.selectedProperty = undefined;
  //   // }
  // }

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
