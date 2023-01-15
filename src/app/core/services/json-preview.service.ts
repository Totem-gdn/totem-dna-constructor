import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PropertyModel } from "../models/property.model";

@Injectable({ providedIn: 'root' })

export class JSONPreviewService {

    private _json = new BehaviorSubject<PropertyModel[]>([]);

    get json$() { return this._json.asObservable() }
    get json() { return this._json.getValue() }
    set json(json: any[]) { this._json.next(json) }
}