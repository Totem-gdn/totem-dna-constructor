import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MENUTITLE } from '../../../../core/enums/menu.enum';
import { MenuModel } from '../../../../core/models/menu.model';

@Component({
  selector: 'asset-types',
  templateUrl: './asset-types.component.html',
  styleUrls: ['./asset-types.component.scss']
})
export class AssetTypesComponent implements OnInit {
  @Output() selectTypeEvent: EventEmitter<string> = new EventEmitter();
  menu: MenuModel[] = [
    { title: MENUTITLE.AVATAR, active: true },
    { title: MENUTITLE.ITEM, active: false },
    { title: MENUTITLE.GEM, active: false },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelectType(asset: MenuModel): void {
    this.menu.forEach((item: MenuModel) => {
      if (item.title === asset.title) {
        item.active = true;
      } else {
        item.active = false;
      }
    })
    this.selectTypeEvent.emit(asset.title);
  }

}
