import { Injectable } from "@angular/core";
import { PROPERTIES } from "@app/core/enums/properties.enum";
import { PropertiesEvent, PropertyModel } from "@app/core/models/property.model";
import { DataService } from "@app/modules/main/services/data.service";
import { BehaviorSubject, Subject } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { GENE_EVENT } from "../enums/gene.enum";
import { DefaultProperties } from "../models/default-properties.model";
import { FormModel } from "../models/form.model";
import { GeneChangeEvent } from "../models/gene.model";
import { AssetsService } from "./assets.service";
import { GenesService } from "./genes.service";

@Injectable({ providedIn: 'root' })

export class PropertiesService {


  constructor(private dataService: DataService,
    private assetsService: AssetsService,
    private genesService: GenesService) { }

  private _properties = new BehaviorSubject<PropertyModel[]>([])
  private _selectedProperty = new BehaviorSubject<PropertyModel>({})

  private _form = new BehaviorSubject<PropertyModel[]>([]);
  get form$() { return this._form.asObservable() }
  get form() { return this._form.getValue() }
  set form(form: PropertyModel[]) { this._form.next(form) }

  get setForm$() { return this._properties.asObservable() }
  set setForm(properties: PropertyModel[]) { this._properties.next(properties) }

  _assetType = new BehaviorSubject<ASSET_TYPE>(ASSET_TYPE.AVATAR);
  get assetType() { return this._assetType.getValue(); }
  get assetType$() { return this._assetType.asObservable() }
  set assetType(type: ASSET_TYPE) {
    this.assetsService.storeForm(this.assetType, this.form);
    this._assetType.next(type);
    console.log(this.assetsService.getFormByType(type))
    this.setForm = this.assetsService.getFormByType(type);
    this.genesService.reset();

  }


  get selectedProperty$() { return this._selectedProperty.asObservable() }
  get selectedProperty() { return this._selectedProperty.getValue() }
  set selectedProperty(property: PropertyModel) { this._selectedProperty.next(property) }


  addProperty(type: PROPERTIES, index?: number): void {
    const properties = [...this.form];

    let untitledMaxIndex = '';
    for(let i = 0; i < properties.length; ++i) {
      const prop = properties[i];

      if(prop.description?.includes('Untitled')) {
        const index = prop.description?.replace("Untitled ", "");
        if(index == '' && untitledMaxIndex == '') {
          untitledMaxIndex = '0';
          i = 0;
          continue;
        }
        if(index == untitledMaxIndex) {
          untitledMaxIndex = (+index + 1).toString();
          i = 0;
        }
      }
    }

    const defaultPropsObj = new DefaultProperties(type);
    const defaultProp: PropertyModel = {
      ...defaultPropsObj,
      description: `Untitled ${untitledMaxIndex}`,
    };
    if(type == 'bool') {
      defaultProp.length = '1';
      defaultProp.values =['','']
    }


    console.log('default', defaultProp)

    if (index == undefined) properties.push(defaultProp);
    else properties.splice(index, 0, defaultProp);


    if (index == undefined) this.selectedProperty = properties[properties.length - 1];
    else this.selectedProperty = properties[index];
    console.log('index', properties.length, 'selected prop', this.selectedProperty)
    // console.log('propers', properties)
    this.setForm = properties;
    // this.addProperty$.next(defaultProperty);
  }

  swapProperties(prev: number, curr: number) {
    const props = [...this.form];
    const temp = props[prev];
    props[prev] = props[curr];
    props[curr] = temp;
    this.setForm = props;
  }

  removeProperty(property: PropertyModel) {
    const properties = [...this.form];

    const filtered = properties.filter(prop => { return prop.description != property.description });
    for(let prop of filtered) this.genesService.removeGeneByProperty(prop)
    this.setForm = filtered;
  }

  // propertiesByJSON(properties: PropertyModel[]) {
  //   // return;
  //   this.properties = [...properties];
  //   this.selectedProperty = this.properties[0];
  //   console.log('properties', properties)
  // }

  resetAll() {
    this.setForm = [];
    this.selectedProperty = {};
  }
}