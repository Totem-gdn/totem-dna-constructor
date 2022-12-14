export interface PropertyModel {
    description?: string,
    id?: string,
    type?: string,
    gene?: number | null,
    start?: number | null,
    lenght?: number | null,
    active?: boolean,
    offset?: number | null;
}

export interface PropertyUpdateModel {
    item: PropertyModel;
    index?: number;
}