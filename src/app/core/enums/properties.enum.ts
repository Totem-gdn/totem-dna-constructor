// export enum PROPERTIES {
//     BOOLEAN = 'boolean',
//     INTEGER = 'integer',
//     ENUM = 'enum',
//     RANGE = 'Range',
//     COLOR = 'Color',
// }
export enum PROPERTIES {
    BOOLEAN = 'bool',
    INTEGER = 'int',
    ENUM = 'map',
    RANGE = 'range',
    COLOR = 'Color',
}

export enum PROPERTY_EVENTS {
    ADD_PROPERTY = 'add-property'
}

export enum PROPERTIES_EVENTS {
    RESET = 'reset', 
    SET = 'set', 
    STASH = 'stash'
}

export enum MAP_PROPERTIES {
    boolean = PROPERTIES.BOOLEAN
}

export enum BOOLEAN_VALUES {
    NEGATIVE_VALUE = 'Negative-Value',
    POSITIVE_VALUE = 'Positive-Value'
}