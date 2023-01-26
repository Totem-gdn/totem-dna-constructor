import { Component, OnInit } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/enums/asset.enum';
import { AssetInfo } from '@app/core/models/asset.model';
import { GameInfo } from '@app/core/models/game.model';
import { AssetsService } from '@app/core/services/assets.service';
import { GenesService } from '@app/core/services/genes.service';
import { PopupsService } from '@app/core/services/popups.service';
import { PropertiesService } from '@app/core/services/properties.service';

@Component({
  selector: 'choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss'],
  animations: [
    Animations.animations
  ]
})
export class ChooseTemplateComponent implements OnInit {

  constructor(private assetsService: AssetsService,
              private propertiesService: PropertiesService,
              private genesService: GenesService,
              private popupService: PopupsService) { }

  showDropdown: boolean = false;
  games!: GameInfo[];

  ngOnInit(): void {
    this.loadGames();
  }
  onBlur() {
    this.showDropdown = false;
    // console.log('blur')
  }

  async onClickItem(game: GameInfo) {
    this.showDropdown = false;
    
    const type = this.assetsService.assetType ? this.assetsService.assetType : ASSET_TYPE.AVATAR;
    
    const props = this.propertiesService.formProperties.value;
    
    const popupRes = !props?.length ? true : await this.popupService.templatePopupAsync()
    
    const json = await this.assetsService.fetchJSONByGame(type, game);
    
    if(popupRes) {
      this.genesService.reset();
      this.propertiesService.setForm = json;
    }
  }

  loadGames() {
    this.assetsService.fetchGamesByFilter('')
      .subscribe(games => {
        // console.log('games', games)
        this.games = games;
      })
  }

}
