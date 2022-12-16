import { Injectable } from '@angular/core';
import { PROPERTIES_LOWERCASE } from '../enums/properties.enum';

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
      length: 0,
      active: false,
      values: []
    },
    integer: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.INTEGER,
      gene: 0,
      offset: 0,
      length: 0,
      active: false
    },
    Color: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.COLOR,
      gene: 0,
      offset: 0,
      length: 0,
      active: false
    },
    range: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.RANGE,
      gene: 0,
      offset: 0,
      length: 0,
      active: false,
      values: []
    },
    enum: {
      description: "",
      id: "",
      type: PROPERTIES_LOWERCASE.ENUM,
      gene: 0,
      offset: 0,
      length: 0,
      active: false,
      values: []
    },
  }

  constructor() { }
}
