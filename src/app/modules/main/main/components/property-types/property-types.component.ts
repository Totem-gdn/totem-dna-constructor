import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AssetsService } from '@app/core/services/assets.service';
import { ListService } from '@app/core/services/list.service';
import { PopupsService } from '@app/core/services/popups.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { PROPERTIES } from '../../../../../core/enums/properties.enum';

@Component({
  selector: 'property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss']
})
export class PropertyTypesComponent implements OnInit {

  constructor(private popupService: PopupsService,
              private propertiesService: PropertiesService,
              private assetsService: AssetsService,
              private listService: ListService) {}
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

  bodyElement: HTMLElement = document.body;

  dragStart(event: CdkDragStart) {
    this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'move'; 
    //replace 'move' with what ever type of cursor you want
  }

  drop(event: CdkDragDrop<string[]>) {
    this.bodyElement.classList.remove('inheritCursors');
    this.bodyElement.style.cursor = 'unset';
  }

  addProperty(type: PROPERTIES): void {
    this.propertiesService.addDefaultProperty(type)
    // this.listService.showGenes = false;
    // this.assetsService.assetForm(type)
    // this.addProperty.emit(asset);
  }

}
