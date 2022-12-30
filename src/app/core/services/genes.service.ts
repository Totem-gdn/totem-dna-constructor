import { Injectable } from "@angular/core";
import { EGene } from "@app/modules/main/enums/gene.enum";
import { GeneChangeEvent } from "@app/modules/main/models/gene.model";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable({ providedIn: 'root' })

export class GenesService {

    private _changeEvent = new Subject<GeneChangeEvent>();

    get geneDataChanges$() { return this._changeEvent.asObservable() }

    geneChangeEvent(e: GeneChangeEvent) {
        if(e.event == EGene.GENE) {
            this._changeEvent.next(e);
        }
        if(e.event == EGene.LENGTH) {
            this._changeEvent.next(e);
        }
        if(e.event == EGene.OFFSET) {
            this._changeEvent.next(e);
        }
    }
}