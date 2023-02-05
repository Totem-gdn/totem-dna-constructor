import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/enums/asset.enum';
import { AssetInfo } from '@app/core/models/asset.model';
import { GameInfo } from '@app/core/models/game.model';
import { AssetsService } from '@app/core/services/assets.service';
import { GenesService } from '@app/core/services/genes.service';
import { PopupsService } from '@app/core/services/popups.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { throws } from 'assert';

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
  title?: string = 'Choose template';

  @ViewChild('serch') searchRef?: ElementRef;

  reset: boolean = false;

  ngOnInit(): void {
    this.loadGames();
  }
  onBlur(e: any) {
    if(e.relatedTarget) return;
    // this.showDropdown = false;
    // this.reset = !this.reset;
    this.resetAll();
  }

  async onClickItem(game: GameInfo) {
    // this.showDropdown = false;
    
    const type = this.assetsService.assetType ? this.assetsService.assetType : ASSET_TYPE.AVATAR;
    
    const props = this.propertiesService.formProperties.value;
    
    const popupRes = !props?.length ? true : await this.popupService.templatePopupAsync()

    const json = await this.assetsService.fetchJSONByGame(type, game);
    this.resetAll();

    if(popupRes) {
      this.genesService.reset();
      this.propertiesService.setForm = json;
      this.title = game?.general?.name;
    }
  }

  onSearch(filter: string) {
    this.assetsService.getGamesByFilter(filter).subscribe(games => {
      this.games = games;
    })
  }

  resetAll() {
    this.reset = !this.reset;
    this.showDropdown = false;
    this.loadGames();
  }

  loadGames() {
    this.assetsService.fetchGamesByFilter('')
      .subscribe(games => {
        this.games = games;
      })
  }

}
