import { Injectable } from "@angular/core";
import { Form, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { PROPERTIES } from "@app/core/enums/properties.enum";
import { PropertiesEvent, PropertyModel } from "@app/core/models/property.model";
import { DataService } from "@app/modules/main/services/data.service";
import { BehaviorSubject, Subject } from "rxjs";
import { ASSET_TYPE } from "../enums/asset.enum";
import { GENE_EVENT } from "../enums/gene.enum";
import { DefaultProperties } from "../models/default-properties.model";
import { FormModel } from "../models/form.model";
import { GeneChangeEvent } from "../models/gene.model";
import { GenesService } from "./genes.service";
import { ValidatorsService } from "./validators.service";

@Injectable({ providedIn: 'root' })

export class PropertiesService {
  formProperties!: FormArray;

  constructor(private dataService: DataService,
    private genesService: GenesService,
    private validatorsService: ValidatorsService) { }





  private _properties = new BehaviorSubject<PropertyModel[]>([]);
  get properties$() { return this._properties.asObservable() }
  get properties() { return this._properties.getValue() }
  set properties(properties: PropertyModel[]) { this._properties.next(properties) }
  get setForm$() { return this._properties.asObservable() }
  set setForm(properties: PropertyModel[]) { this._properties.next(properties) }



  private _selectedFormGroup = new BehaviorSubject<FormGroup | null>(null)
  get selectedFormGroup$() { return this._selectedFormGroup.asObservable() }
  get selectedFormGroup() { return this._selectedFormGroup.getValue() }
  set selectedFormGroup(property: FormGroup | null) { this._selectedFormGroup.next(property) }


  addDefaultProperty(type: PROPERTIES, index?: number): void {
    console.log('add form', this.formProperties?.value)
    const properties = this.formProperties?.value;

    let untitledMaxIndex = '';
    for (let i = 0; i < properties.length; ++i) {
      const prop = properties[i];

      if (prop.description?.includes('Untitled')) {
        const index = prop.description?.replace("Untitled ", "");
        if (index == '' && untitledMaxIndex == '') {
          untitledMaxIndex = '0';
          i = 0;
          continue;
        }
        if (index == untitledMaxIndex) {
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
    if (type == 'bool') {
      defaultProp.length = '1';
      defaultProp.values = ['', '']
    }

    this.addProperty(defaultProp)
  }

  addProperty(property: PropertyModel) {

    const propertyForm = new FormGroup({});

    for (let [key, value] of Object.entries(property)) {
      const type = property.type || '';

      if (key != 'values') {
        propertyForm.addControl(key, new FormControl(value));
        const formControl = propertyForm.get(key) as FormControl;
        this.validatorsService.propertyValidators(formControl, key, type)
        // console.log('form control', formControl)
      } if (type == 'bool' && key == 'values') {

        propertyForm.addControl(key, new FormArray([]));
        const valuesFormArray = propertyForm.get('values' as string) as FormArray;

        for (let val of value) {
          valuesFormArray.push(new FormControl(val, Validators.required));
        }
        console.log('bool', valuesFormArray)
      } if (key == 'values') {
        // if(!propertyForm) return;
        propertyForm.addControl('values', new FormArray([]));
        const valuesArray: FormArray = propertyForm.get('values' as string) as FormArray;
        // console.log('key', key, 'type', type)
        if (type == 'map') {
          for (let [index, values] of value.entries()) {
            valuesArray.push(new FormGroup({}));
            const valuesFormGroup = valuesArray.controls[index] as FormGroup;
            // console.log('value ket',values, values.key, values.value)
            valuesFormGroup.addControl('key', new FormControl(values.key))
            valuesFormGroup.addControl('value', new FormControl(values.value))
            // const valuesGroup
          }
          // console.log('values array', valuesArray)
        }

      }

      
      // console.log('form', this.formProperties)
    }
    this.formProperties.push(propertyForm);
    this.selectedFormGroup = propertyForm;
  }

  swapProperties(prev: number, curr: number) {
    // const props = [...this.form];
    // const temp = props[prev];
    // props[prev] = props[curr];
    // props[curr] = temp;
    // this.setForm = props;
  }

  removeProperty(property: PropertyModel) {
    // const properties = [...this.form];

    // const filtered = properties.filter(prop => { return prop.description != property.description });
    // for(let prop of filtered) this.genesService.removeGeneByProperty(prop)
    // this.setForm = filtered;
  }

  resetAll() {
    this.setForm = [];
    // this.selectedProperty = {};
  }
}