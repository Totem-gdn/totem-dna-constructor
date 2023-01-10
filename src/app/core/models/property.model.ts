import { PROPERTIES } from "../enums/properties.enum";

export interface PropertyModel {
    description?: string;
    id?: string;
    type?: PROPERTIES;
    gene?: string;
    start?: string;
    length?: string;
}

export interface PropertyUpdateModel {
    item: PropertyModel;
    index?: number;
}