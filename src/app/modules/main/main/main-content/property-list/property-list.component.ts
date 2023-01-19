import { CdkDrag } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AssetsService } from '@app/core/services/assets.service';
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
  selectedProperty?: PropertyModel;
  subs = new Subject<void>();

  constructor(private propertiesService: PropertiesService,
              private assetsService: AssetsService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedProperty$();
    this.properties$();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetector.detectChanges();
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
        this.properties = properties;
      })
  }

  selectProperty(property: PropertyModel) {
    this.propertiesService.selectedProperty = property;
  }

  deleteProperty(property: PropertyModel) {
    this.propertiesService.removeProperty(property);
  }

  drop(e: any) {
    if(e.item.data == 'self') {
      this.propertiesService.swapProperties(e.previousIndex, e.currentIndex)
    } else {
      const type = (e.item.data as PROPERTIES)
      const index: number = e.currentIndex;
      this.propertiesService.addProperty(type, index);
      console.log('drop' , e)
    }
  }


  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
