import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { AssetInfo } from "../models/asset.model";
import { ApiResponse, GameInfo } from "../models/game.model";
import { PropertyModel } from "../models/property.model";
const DNAFilter = require('totem-common-files');


@Injectable({providedIn: 'root'})

export class AssetsService {
    apiUrl = 'https://api.totem-explorer.com';

    constructor(private http: HttpClient) {}

    fetchGamesByFilter(filter: string) {
        return this.http.get<GameInfo[]>(`${this.apiUrl}/games/search?name=${filter}`)
            .pipe(map(games => games))

    }
    fetchAssetsByFilter(type: ASSET_TYPE, filter: string, page: number = 1) {
        return this.http.get<ApiResponse<AssetInfo[]>>(`${this.apiUrl}/assets/${type}s?search=${filter}&page=${page}`)
            .pipe(map(games => games.data))
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