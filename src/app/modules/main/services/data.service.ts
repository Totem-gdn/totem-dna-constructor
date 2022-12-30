import { Injectable } from '@angular/core';
import { PROPERTIES } from '../enums/properties.enum';
// import { PROPERTIES } from '../enums/properties.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  defaultTypesObject = {
    boolean: {
      description: "",
      id: "",
      type: PROPERTIES.BOOLEAN,
      gene: 0,
      offset: 0,
      length: 0,
      active: false,
      values: []
    },
    integer: {
      description: "",
      id: "",
      type: PROPERTIES.INTEGER,
      gene: 0,
      offset: 0,
      length: 0,
      active: false
    },
    Color: {
      description: "",
      id: "",
      type: PROPERTIES.COLOR,
      gene: 0,
      offset: 0,
      length: 0,
      active: false
    },
    range: {
      description: "",
      id: "",
      type: PROPERTIES.RANGE,
      gene: 0,
      offset: 0,
      length: 0,
      active: false,
      values: []
    },
    enum: {
      description: "",
      id: "",
      type: PROPERTIES.ENUM,
      gene: 0,
      offset: 0,
      length: 0,
      active: false,
      values: []
    },
  }

  constructor() { }
}
