import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ListItem } from "../models/asset.model";

@Injectable({providedIn: 'root'})

export class ListService {

    private _formValidity = new BehaviorSubject<ListItem[]>([]);

    showGenes = false;
    get formValidity$() { return this._formValidity.asObservable()}

    set formValidity(form: ListItem[]) {
        this._formValidity.next(form);
    }   
}