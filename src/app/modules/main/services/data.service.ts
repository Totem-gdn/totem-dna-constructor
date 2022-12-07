import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  defaultTypesObject = {
    boolean: { description: "boolean", id: "", type: "", gene: 0, start: 0, length: 0, active: false },
    integer: { description: "integer", id: "", type: "", gene: 0, start: 0, length: 0, active: false },
    color: { description: "color", id: "", type: "", gene: 0, start: 0, length: 0, active: false },
    range: { description: "range", id: "", type: "", gene: 0, start: 0, length: 0, active: false, values: [{ min: 0, max: 0, keyName: '' }] },
    enum: { description: "enum", id: "", type: "", gene: 0, start: 0, length: 0, active: false, values: [{ value: 0, keyName: '' }] },
  }

  constructor() { }
}
