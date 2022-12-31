import { Injectable } from "@angular/core";
import { PROPERTIES } from "@app/modules/main/enums/properties.enum";

@Injectable({providedIn: 'root'})

export class DefaultPropertiesService {
    defaultTypesObject = {
        bool: {
          description: "",
          id: "",
          type: PROPERTIES.BOOLEAN,
          gene: 0,
          offset: 0,
          length: 0,
          active: false,
          values: []
        },
        int: {
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
        map: {
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
}