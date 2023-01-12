import { Component, OnInit } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/enums/asset.enum';
import { AssetInfo } from '@app/core/models/asset.model';
import { GameInfo } from '@app/core/models/game.model';
import { AssetsService } from '@app/core/services/assets.service';
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
              private propertiesService: PropertiesService) { }

  showDropdown: boolean = false;
  games!: GameInfo[];

  ngOnInit(): void {
    this.loadGames();
  }

  async onClickItem(game: GameInfo) {
    this.showDropdown = false;
    const json = await this.assetsService.fetchJSONByGame(ASSET_TYPE.AVATAR, game);

    this.propertiesService.propertiesByJSON(json);
  }

  loadGames() {
    this.assetsService.fetchGamesByFilter('')
      .subscribe(games => {
        // console.log('games', games)
        this.games = games;
      })
  }

}
