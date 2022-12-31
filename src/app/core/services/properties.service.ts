import { Injectable } from "@angular/core";
import { PROPERTIES } from "@app/modules/main/enums/properties.enum";
import { PropertyModel } from "@app/modules/main/models/property.model";
import { DataService } from "@app/modules/main/services/data.service";
import { BehaviorSubject } from "rxjs";
import { DefaultPropertiesService } from "./default-properties.service";

@Injectable({providedIn: 'root'})

export class PropertiesService {

    constructor(private dataService: DataService,
                private defaultProps: DefaultPropertiesService) {}

    private _properties = new BehaviorSubject<PropertyModel[]>([])
    private _selectedProperty = new BehaviorSubject<PropertyModel>({})

    get properties$() { return this._properties.asObservable() }
    get properties() { return this._properties.getValue() }
    set properties(properties: PropertyModel[]) { this._properties.next(properties) }

    get selectedProperty$() { return this._selectedProperty.asObservable() }
    get selectedProperty() { return this._selectedProperty.getValue() }
    set selectedProperty(property: PropertyModel) { this._selectedProperty.next(property) }
    
    

    addProperty(type: PROPERTIES): void {
        // this.propertyList.forEach((elem: PropertyModel) => {
        //   elem.active = false;
        // })
        // let newProperty: PropertyModel = this.dataService.defaultTypesObject

        const properties = this.properties;
        const newProperty: PropertyModel = {
            ...this.defaultProps.defaultTypesObject[type],
            active: true,
            description: `Untitled ${this.properties.length + 1}`,
          };
        // const newProperty: PropertyModel = {
        //   ...this.defaultProps.defaultTypesObject[type],
        //   description: `Untitled ${properties.length + 1}`,
        // };
        this.properties.push(newProperty);
        this.selectedProperty = newProperty;
      }
}