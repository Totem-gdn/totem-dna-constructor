import { EGene } from "../enums/gene.enum";

export interface IGene {
    gene?: string;
    offset?: string;
    length?: string;
}

export interface GeneChangeEvent {
    event: EGene;
    value: string;
}