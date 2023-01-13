import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ASSET_TYPE } from '@app/core/enums/asset.enum';
import { AssetsService } from '@app/core/services/assets.service';
import { GenesService } from '@app/core/services/genes.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { MENUTITLE } from '../../../../../core/enums/menu.enum';
import { MenuModel } from '../../../../../core/models/menu.model';

@Component({
  selector: 'asset-types',
  templateUrl: './asset-types.component.html',
  styleUrls: ['./asset-types.component.scss']
})
export class AssetTypesComponent implements OnInit {
  @Output() selectTypeEvent: EventEmitter<string> = new EventEmitter();
  menu: MenuModel[] = [
    { title: ASSET_TYPE.AVATAR, active: true },
    { title: ASSET_TYPE.ITEM, active: false },
    { title: ASSET_TYPE.GEM, active: false },
  ];
  
  constructor(private assetsService: AssetsService,
              private propertiesService: PropertiesService,
              private genesService: GenesService) { }

  ngOnInit(): void {
    this.assetsService.assetType = ASSET_TYPE.AVATAR;
  }

  onSelectType(asset: MenuModel): void {
    this.menu.forEach((item: MenuModel) => {
      if (item.title === asset.title) {
        item.active = true;
      } else {
        item.active = false;
      }
    })
    this.genesService.reset();
    this.assetsService.assetType = asset.title;
    // this.selectTypeEvent.emit(asset.title);
  }

}
