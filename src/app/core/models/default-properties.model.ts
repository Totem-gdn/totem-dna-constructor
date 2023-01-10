import { PROPERTIES } from "../enums/properties.enum";
import { PropertyModel } from "./property.model";

export class DefaultProperties {
    description?: string = '';
    id?: string = '';
    gene?: string = '';
    start?: string = '';
    length?: string = '';
    type?: PROPERTIES;

    constructor(type: PROPERTIES) {
        this.type = type;
    }

}