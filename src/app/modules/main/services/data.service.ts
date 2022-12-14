import { Injectable } from '@angular/core';
import { PROPERTIES_LOWERCASE } from '../enums/properties.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  defaultTypesObject = {
    boolean: { description: "", id: "", type: PROPERTIES_LOWERCASE.BOOLEAN, gene: null, offset: null, lenght: null, active: false },
    integer: { description: "", id: "", type: PROPERTIES_LOWERCASE.INTEGER, gene: null, offset: null, lenght: null, active: false },
    color: { description: "", id: "", type: PROPERTIES_LOWERCASE.COLOR, gene: null, offset: null, lenght: null, active: false },
    range: { description: "", id: "", type: PROPERTIES_LOWERCASE.RANGE, gene: null, offset: null, lenght: null, active: false, values: [{ min: null, max: null, keyName: '' }] },
    enum: { description: "", id: "", type: PROPERTIES_LOWERCASE.ENUM, gene: null, offset: null, lenght: null, active: false, values: [{ value: null, keyName: '' }] },
  }

  constructor() { }
}
