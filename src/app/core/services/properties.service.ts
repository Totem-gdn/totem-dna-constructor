import { Injectable } from "@angular/core";
import { PROPERTIES } from "@app/core/enums/properties.enum";
import { PropertyModel } from "@app/core/models/property.model";
import { DataService } from "@app/modules/main/services/data.service";
import { BehaviorSubject } from "rxjs";
import { DefaultProperties } from "../models/default-properties.model";

@Injectable({ providedIn: 'root' })

export class PropertiesService {

  constructor(private dataService: DataService,) { }

  private _properties = new BehaviorSubject<PropertyModel[]>([])
  private _selectedProperty = new BehaviorSubject<PropertyModel>({})

  get properties$() { return this._properties.asObservable() }
  get properties() { return this._properties.getValue() }
  set properties(properties: PropertyModel[]) { this._properties.next(properties) }

  get selectedProperty$() { return this._selectedProperty.asObservable() }
  get selectedProperty() { return this._selectedProperty.getValue() }
  set selectedProperty(property: PropertyModel) { this._selectedProperty.next(property) }



  addProperty(type: PROPERTIES): void {

    const defaultProps = new DefaultProperties(type);
    const newProperty: PropertyModel = {
      ...defaultProps,
      description: `Untitled ${this.properties.length + 1}`,
    };

    this.properties.push(newProperty);
    this.selectedProperty = newProperty;
  }

  updateSelectedPropertyById(control: any) {
    const property = this.selectedProperty;
    const key: keyof PropertyModel = control.name;
    const value = control.value;

    const update = this.properties.filter(prop => { return prop.id == property.id});
    console.log(update, 'update')
    property[key] = value;


  }


  removeProperty(property: PropertyModel) {
    const properties = this.properties;

    const filtered = properties.filter(prop => {return prop != property});
    console.log('noew' , filtered)
    this.properties = filtered;
  }
}