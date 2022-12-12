export interface PropertyModel {
    description?: string,
    id?: string,
    type?: string,
    gene?: number,
    start?: number,
    lenght?: number,
    active?: boolean,
    offset?: number;
}

export interface PropertyUpdateModel {
    item: PropertyModel;
    index?: number;
}