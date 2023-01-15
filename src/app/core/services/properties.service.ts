import { Injectable } from "@angular/core";
import { PROPERTIES } from "@app/core/enums/properties.enum";
import { PropertyModel } from "@app/core/models/property.model";
import { DataService } from "@app/modules/main/services/data.service";
import { BehaviorSubject, Subject } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { GENE_EVENT } from "../enums/gene.enum";
import { DefaultProperties } from "../models/default-properties.model";
import { FormModel } from "../models/form.model";
import { GeneChangeEvent } from "../models/gene.model";
import { GenesService } from "./genes.service";

@Injectable({ providedIn: 'root' })

export class PropertiesService {

  constructor(private dataService: DataService,
              private genesService: GenesService) { }

  private _properties = new BehaviorSubject<PropertyModel[]>([])
  private _selectedProperty = new BehaviorSubject<PropertyModel>({})
  


    // get properties$() { return this._properties.asObservable() }
    // get properties() { return this._properties.getValue() }
    // set properties(properties: PropertyModel[]) { this._properties.next(properties) }

  get properties$() { return this._properties.asObservable() }
  get properties() { return this._properties.getValue() }
  set properties(properties: PropertyModel[]) { this._properties.next(properties) }

  get selectedProperty$() { return this._selectedProperty.asObservable() }
  get selectedProperty() { return this._selectedProperty.getValue() }
  set selectedProperty(property: PropertyModel) { this._selectedProperty.next(property) }

  // addProperty$ = new Subject<PropertyModel>();


  addProperty(type: PROPERTIES): void {

    const defaultProps = new DefaultProperties(type);
    const defaultProperty: PropertyModel = {
      ...defaultProps,
      description: `Untitled ${this.properties.length + 1}`,
    };
    const properties = this.properties;
    properties.push(defaultProperty);
    this.properties = properties;
    // this.addProperty$.next(defaultProperty);
  }

  removeProperty(property: PropertyModel) {
    const properties = this.properties;

    const filtered = properties.filter(prop => {return prop != property});
    // console.log('noew' , filtered)
    this.properties = filtered;
  }

  propertiesByJSON(properties: PropertyModel[]) {
    // return;
    this.properties = [...properties];
    this.selectedProperty = this.properties[0];
    console.log('properties', properties)
  }

  resetAll() {
    this.properties = [];
    this.selectedProperty = {};
  }
}