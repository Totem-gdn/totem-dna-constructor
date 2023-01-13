import { Injectable } from "@angular/core";
import { PROPERTIES } from "@app/core/enums/properties.enum";
import { PropertyModel } from "@app/core/models/property.model";
import { DataService } from "@app/modules/main/services/data.service";
import { BehaviorSubject } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { GENE_EVENT } from "../enums/gene.enum";
import { DefaultProperties } from "../models/default-properties.model";
import { GeneChangeEvent } from "../models/gene.model";
import { GenesService } from "./genes.service";

@Injectable({ providedIn: 'root' })

export class PropertiesService {

  constructor(private dataService: DataService,
              private genesService: GenesService) { }

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

    // this.genesService.geneChangeEvent({event: GENE_EVENT.RESET_ALL})
    // const events: GeneChangeEvent[] = [];

    // for(let prop of properties) {
    //   const id = prop.description;
    //   const start = prop.start;
    //   const length = prop.length;
    //   const gene = prop.gene;
    //   events.push({id, value: gene, event: GENE_EVENT.GENE});
    //   events.push({id, value: start, event: GENE_EVENT.START});
    //   events.push({id, value: length, event: GENE_EVENT.LENGTH});
    // }
    // console.log(events)
    // for(let event of events) this.genesService.geneChangeEvent(event);
  }

  resetAll() {
    this.properties = [];
    this.selectedProperty = {};
  }
}