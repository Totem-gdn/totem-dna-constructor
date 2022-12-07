import { Injectable } from '@angular/core';
import { PROPERTIES_LOWERCASE } from '../enums/properties.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  defaultTypesObject = {
    boolean: { description: "boolean", id: "", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: 0, start: 0, length: 0, active: false },
    integer: { description: "integer", id: "", type: PROPERTIES_LOWERCASE.INTEGER, gene: 0, start: 0, length: 0, active: false },
    color: { description: "color", id: "", type: PROPERTIES_LOWERCASE.COLOR, gene: 0, start: 0, length: 0, active: false },
    range: { description: "range", id: "", type: PROPERTIES_LOWERCASE.RANGE, gene: 0, start: 0, length: 0, active: false, values: [{ min: 0, max: 0, keyName: '' }] },
    enum: { description: "enum", id: "", type: PROPERTIES_LOWERCASE.ENUM, gene: 0, start: 0, length: 0, active: false, values: [{ value: 0, keyName: '' }] },
  }

  constructor() { }
}
