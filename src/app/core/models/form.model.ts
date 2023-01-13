
export interface FormModel {
    description?: string;
    id?: string;
    gene?: string;
    start?: string;
    length?: string;
}

export class DefaultFormModel {
    description?: string = '';
    id?: string = '';
    gene?: string = '';
    start?: string = '';
    length?: string = '';
}