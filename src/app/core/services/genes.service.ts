import { Injectable } from "@angular/core";
import { GENE_EVENT } from "@app/core/enums/gene.enum";
import { GeneChangeEvent } from "@app/core/models/gene.model";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable({ providedIn: 'root' })

export class GenesService {

    private _changeEvent = new Subject<GeneChangeEvent>();

    get geneDataChanges$() { return this._changeEvent.asObservable() }

    geneChangeEvent(e: GeneChangeEvent) {
        // if(e.event == GENE_EVENT.GENE) {
        //     this._changeEvent.next(e);
        // }
        // if(e.event == GENE_EVENT.LENGTH) {
        //     this._changeEvent.next(e);
        // }
        // if(e.event == GENE_EVENT.START) {
        //     this._changeEvent.next(e);
        // }
        this._changeEvent.next(e);
    }

    removeGeneByName(id: string) {
        const e: GeneChangeEvent = {id, event: GENE_EVENT.RESET};

        this._changeEvent.next(e);
    }
}