import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, map, Subscription, takeUntil } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { PROPERTIES } from "../enums/properties.enum";

export enum POPUP_STATE {
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
    PENDING = 'pending'
}

@Injectable({providedIn: 'root'})

export class PopupsService {

    private _templatePopup = new BehaviorSubject<POPUP_STATE>(POPUP_STATE.REJECTED);

    // get templatePopup() {
    //     this._templatePopup.next('accepted');
    // }
    get templatePopup() {
        return this._templatePopup.getValue();
    }
    set templatePopup(state: POPUP_STATE) {
        this._templatePopup.next(state);
    }
    async templatePopupAsync() {
        let sub: Subscription;
        this.templatePopup = POPUP_STATE.PENDING;

        return new Promise((resolve, reject) => {
            sub = this._templatePopup
                .subscribe(state => {
                    if(state == POPUP_STATE.ACCEPTED) {
                        resolve(true);
                        sub.unsubscribe();
                        this.templatePopup = POPUP_STATE.REJECTED;
                    }
                    if(state == POPUP_STATE.REJECTED) {
                        resolve(false);
                        sub.unsubscribe();
                        this.templatePopup = POPUP_STATE.REJECTED;
                    }
                })
        })
    }
    get templatePopup$() { return this._templatePopup.asObservable() }
}