import { CdkDrag } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ListItem } from '@app/core/models/asset.model';
import { AssetsService } from '@app/core/services/assets.service';
import { ListService } from '@app/core/services/list.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { Subject } from 'rxjs';
import { MAP_PROPERTIES, PROPERTIES } from '../../../../../core/enums/properties.enum';
import { PropertyModel } from '../../../../../core/models/property.model';



@Component({
  selector: 'property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy, OnChanges {


  properties?: PropertyModel[];
  propertiesValidity?: ListItem[];

  selectedProperty?: PropertyModel;
  subs = new Subject<void>();

  constructor(private propertiesService: PropertiesService,
    private assetsService: AssetsService,
    private changeDetector: ChangeDetectorRef,
    private listService: ListService) { }

  ngOnInit(): void {
    this.selectedProperty$();
    this.properties$();
    this.itemValidity$();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetector.detectChanges();
  }

  itemValidity$() {
    this.listService.formValidity$
      .subscribe(form => {
        this.propertiesValidity = form;
      })
  }
  selectedProperty$() {
    this.propertiesService.selectedProperty$
      .subscribe(selectedProperty => {
        this.selectedProperty = selectedProperty;
      })
  }

  properties$() {
    this.propertiesService.form$
      .subscribe(properties => {
        // this.checkValidity(properties);
        this.properties = properties;

      })
  }

  // checkValidity(props: PropertyModel[]) {
  //   // const propertyItems: ListItem = [];
  //   for(let prop of [...props]) {
  //     for(let [key, value] of Object.entries(prop)) {
  //       console.log('key', key, 'value', value)
  //     }
  //   }

  //   this.properties = props;
  // }

  selectProperty(property: PropertyModel) {
    this.propertiesService.selectedProperty = property;
  }

  deleteProperty(property: PropertyModel) {
    this.propertiesService.removeProperty(property);
  }

  drop(e: any) {
    if (e.item.data == 'self') {
      this.propertiesService.swapProperties(e.previousIndex, e.currentIndex)
    } else {
      const type = (e.item.data as PROPERTIES)
      const index: number = e.currentIndex;
      this.propertiesService.addProperty(type, index);
    }
  }

  onSelect(e: any) {
    const file = e.addedFiles[0];

    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      var text = reader.result;
      if(!text) return;
      const json = JSON.parse(text as string);
      const properties = [...this.propertiesService.form];
      for(const field of json) {
        properties.push(field);
      }
      // const properties = [...this.propertiesService.]
      // const this.propertiesService
      this.propertiesService.setForm = properties;
    };
  }


  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
