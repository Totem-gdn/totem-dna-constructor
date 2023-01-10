import { GENE_EVENT } from "../enums/gene.enum";

export interface IGene {
    gene?: string;
    offset?: string;
    length?: string;
}

export interface GeneChangeEvent {
    event: GENE_EVENT;
    value?: string;
    id?: string;
}

export interface TableItem {
    id?: string;
    gene?: string;
    start?: string;
    length?: string;
}