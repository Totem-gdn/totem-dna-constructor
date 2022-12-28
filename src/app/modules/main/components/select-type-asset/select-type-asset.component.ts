import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MENUTITLE } from '../../enums/menu.enum';
import { MenuModel } from '../../models/menu.model';

@Component({
  selector: 'app-select-type-asset',
  templateUrl: './select-type-asset.component.html',
  styleUrls: ['./select-type-asset.component.scss']
})
export class SelectTypeAssetComponent implements OnInit {
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
