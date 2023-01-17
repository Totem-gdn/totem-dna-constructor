import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, map } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { AssetInfo } from "../models/asset.model";
import { ApiResponse, GameInfo } from "../models/game.model";
import { PropertyModel } from "../models/property.model";
import { PropertiesService } from "./properties.service";
const DNAFilter = require('totem-common-files');


@Injectable({ providedIn: 'root' })

export class AssetsService {
    apiUrl = 'https://api.totem-explorer.com';

    constructor(private http: HttpClient,
        private propertiesService: PropertiesService) { }



    _assetType = new BehaviorSubject<ASSET_TYPE | undefined>(ASSET_TYPE.AVATAR);

     _avatars: PropertyModel[] = [];
     _gems: PropertyModel[] = [];
     _items: PropertyModel[] = [];

    get assetType() { return this._assetType.getValue(); }
    get assetType$() { return this._assetType.asObservable() }
    set assetType(type: ASSET_TYPE | undefined) {
        if (this.assetType == type) return;
        // return;

        if (type == ASSET_TYPE.AVATAR) this.propertiesService.properties = this._avatars;
        if (type == ASSET_TYPE.ITEM) this.propertiesService.properties = this._items;
        if (type == ASSET_TYPE.GEM) this.propertiesService.properties = this._gems;

        this._assetType.next(type);
    }

    // private _selectedGame = new BehaviorSubject<GameInfo>({});
    // set selectedGame(game: GameInfo) { this._selectedGame.next(game) }
    // get selectedGame$() { return this._selectedGame.asObservable() }
    // get selectedGame() { return this._selectedGame.getValue(); }

    fetchGamesByFilter(filter: string) {
        return this.http.get<GameInfo[]>(`${this.apiUrl}/games/search?name=${filter}`)
            .pipe(map(games => games))

    }
    fetchAssetsByFilter(type: ASSET_TYPE, filter: string, page: number = 1) {
        return this.http.get<ApiResponse<AssetInfo[]>>(`${this.apiUrl}/assets/${type}s?search=${filter}&page=${page}`)
            .pipe(map(games => games.data))
    }

    stashForm(form: any) {
        if (this.assetType == ASSET_TYPE.AVATAR) this._avatars = form;
        if (this.assetType == ASSET_TYPE.ITEM) this._items = form;
        if (this.assetType == ASSET_TYPE.GEM) this._gems = form;
    }

    async fetchJSONByGame(type: ASSET_TYPE, game: GameInfo) {
        let jsonUrl: string | undefined = '';
        let json: any;

        if (game?.connections?.dnaFilters) {
            if (type == ASSET_TYPE.AVATAR) {
                jsonUrl = game?.connections?.dnaFilters?.avatarFilter;
            } else if (type == ASSET_TYPE.ITEM) {
                jsonUrl = game?.connections?.dnaFilters?.assetFilter;
            } else if (type == ASSET_TYPE.GEM) {
                jsonUrl = game?.connections?.dnaFilters?.gemFilter;
            }

        }


        if (!jsonUrl) {
            if (type == ASSET_TYPE.AVATAR) {
                json = DNAFilter.avatarFilterJson;
                return json;
            } else {
                json = DNAFilter.itemFilterJson;
                return json;
            }
        }

        json = await firstValueFrom(this.http.get<PropertyModel[]>(jsonUrl));

        return json;
    }
}