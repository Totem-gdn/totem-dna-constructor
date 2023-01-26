import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, map, Observable, of, switchMap } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { AssetInfo } from "../models/asset.model";
import { ApiResponse, GameInfo } from "../models/game.model";
import { PropertyModel } from "../models/property.model";
import { GenesService } from "./genes.service";
const DNAFilter = require('totem-common-files');


@Injectable({ providedIn: 'root' })

export class AssetsService {
    apiUrl = 'https://api.totem-explorer.com';

    constructor(private http: HttpClient,
        // private propertiesService: PropertiesService,
        private genesService: GenesService) { }


        _assetType = new BehaviorSubject<ASSET_TYPE>(ASSET_TYPE.AVATAR);
        get assetType() { return this._assetType.getValue(); }
        get assetType$() { return this._assetType.asObservable() }
        set assetType(type: ASSET_TYPE) {
        //   this.storeForm(this.assetType, this.formProperties.value);
        //   this.formProperties.clear();
          this._assetType.next(type);
        //   this.setForm = this.assetsService.getFormByType(type);
          this.genesService.reset();
        }


    _avatars: PropertyModel[] = [];
    _gems: PropertyModel[] = [];
    _items: PropertyModel[] = [];


    storeForm(type: ASSET_TYPE, form: PropertyModel[]) {
        if (type == ASSET_TYPE.AVATAR) this._avatars = form;
        if (type == ASSET_TYPE.ITEM) this._items = form;
        if (type == ASSET_TYPE.GEM) this._gems = form;
    }

    getFormByType(type: ASSET_TYPE) {
        if (type == ASSET_TYPE.AVATAR) return this._avatars;
        if (type == ASSET_TYPE.ITEM) return this._items;
        if (type == ASSET_TYPE.GEM) return this._gems;
        return [];
    }

    fetchGamesByFilter(filter: string) {
        return this.http.get<GameInfo[]>(`${this.apiUrl}/games/search?name=${filter}`)
            .pipe(map(games => games))

    }
    fetchAssetsByFilter(type: ASSET_TYPE, filter: string, page: number = 1) {
        return this.http.get<ApiResponse<AssetInfo[]>>(`${this.apiUrl}/assets/${type}s?search=${filter}&page=${page}`)
            .pipe(map(games => games.data))
    }

    private _form = new BehaviorSubject<PropertyModel[]>([]);
    get form$() { return this._form.asObservable() }
    get form() { return this._form.getValue() }
    set form(form: PropertyModel[]) { this._form.next(form) }





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