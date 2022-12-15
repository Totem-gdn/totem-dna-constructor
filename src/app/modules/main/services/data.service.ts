import { Injectable } from '@angular/core';
import { BOOLEAN_VALUES, PROPERTIES_LOWERCASE } from '../enums/properties.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  defaultTypesObject = {
    boolean: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.BOOLEAN,
      gene: 0,
      offset: 0,
      lenght: 0,
      active: false,
      values: [BOOLEAN_VALUES.NEGATIVE_VALUE, BOOLEAN_VALUES.POSITIVE_VALUE]
    },
    integer: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.INTEGER,
      gene: 0,
      offset: 0,
      lenght: 0,
      active: false
    },
    color: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.COLOR,
      gene: 0,
      offset: 0,
      lenght: 0,
      active: false
    },
    range: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.RANGE,
      gene: 0,
      offset: 0,
      lenght: 0,
      active: false,
      values: [{ min: 0, max: 0, keyName: '' }]
    },
    enum: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.ENUM,
      gene: 0,
      offset: 0,
      lenght: 0,
      active: false,
      values: [{ value: 0, keyName: '' }]
    },
  }

  constructor() { }
}
