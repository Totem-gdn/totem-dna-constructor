import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GENE_EVENT } from "@app/core/enums/gene.enum";
import { GeneChangeEvent } from "@app/core/models/gene.model";
import { BehaviorSubject, Subject } from "rxjs";
import { FormModel } from "../models/form.model";


@Injectable({ providedIn: 'root' })

export class GenesService {

    private _changeEvent = new Subject<GeneChangeEvent>();

    get geneDataChanges$() { return this._changeEvent.asObservable() }

    geneChangeEvent(e: GeneChangeEvent) {
        // console.log('event', e)
        this._changeEvent.next(e);
    }

    removeGeneByName(e: GeneChangeEvent) {
        // const e: GeneChangeEvent = {id, event: GENE_EVENT.RESET};

        this._changeEvent.next(e);
    }

    reset(action: 'all' = 'all') {
        this.geneChangeEvent({event: GENE_EVENT.RESET_ALL})
    }
}