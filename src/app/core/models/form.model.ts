import { PROPERTIES } from "../enums/properties.enum";

export interface FormModel {
    description?: string;
    id?: string;
    gene?: string;
    start?: string;
    length?: string;
    type?: PROPERTIES;
}

export class DefaultFormModel {
    description?: string = '';
    id?: string = '';
    gene?: string = '';
    start?: string = '';
    length?: string = '';
    type?: PROPERTIES = PROPERTIES.BOOLEAN;

    // constructor(type: PROPERTIES) {
    //     this.type = type;
    // }
}