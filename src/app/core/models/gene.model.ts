import { GENE_EVENT } from "../enums/gene.enum";
import { FormModel } from "./form.model";

export interface IGene {
    gene?: string;
    offset?: string;
    length?: string;
}

export interface GeneChangeEvent {
    event: GENE_EVENT;
    values?: FormModel;
    id?: string;
}

export interface TableItem {
    id?: string;
    gene?: number;
    start?: number;
    length?: number;
}