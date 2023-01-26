import { PROPERTIES, PROPERTIES_EVENTS } from "../enums/properties.enum";

export interface PropertyModel {
    description?: string;
    id?: string;
    gene?: string;
    start?: string;
    length?: string;
    type?: PROPERTIES;
    values?: any[];
}



export interface PropertiesEvent {
    event: PROPERTIES_EVENTS;
    data?: PropertyModel[];
}

export interface PropertyUpdateModel {
    item: PropertyModel;
    index?: number;
}