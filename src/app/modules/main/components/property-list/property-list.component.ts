import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PropertiesService } from '@app/core/services/properties.service';
import { Subject } from 'rxjs';
import { MAP_PROPERTIES, PROPERTIES } from '../../../../core/enums/properties.enum';
import { PropertyModel } from '../../../../core/models/property.model';

@Component({
  selector: 'property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {



  properties?: PropertyModel[];
  selectedProperty?: PropertyModel;
  subs = new Subject<void>();

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.selectedProperty$();
    this.properties$();
  }

  selectedProperty$() {
    this.propertiesService.selectedProperty$
      .subscribe(selectedProperty => {
        this.selectedProperty = selectedProperty;
      })
  }

  properties$() {
    this.propertiesService.properties$
      .subscribe(properties => {
        this.properties = properties;
      })
  }

  selectProperty(property: PropertyModel) {
    this.propertiesService.selectedProperty = property;
  }

  deleteProperty(property: PropertyModel) {
    this.propertiesService.removeProperty(property);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
  // ondelete(item: PropertyModel, index: number): void {
  //   this.onDeleteProperty.emit({ item, index });
  // }
  // onSelect(index: number): void {
  //   this.onSelectProperty.emit(index);
  // }

}
