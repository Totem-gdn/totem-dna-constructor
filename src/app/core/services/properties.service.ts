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


  addDefaultProperty(type: PROPERTIES, atIndex?: number): void {
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

    if(atIndex == undefined) {
      this.addProperty(defaultProp)
    } else {
      this.addProperty(defaultProp, atIndex);
    }
  }

  addProperty(property: PropertyModel, atIndex?: number) {

    const propertyForm = new FormGroup({});

    for (let [key, value] of Object.entries(property)) {
      const type = property.type || '';

      if (key != 'values') {
        propertyForm.addControl(key, new FormControl(value));
        const formControl = propertyForm.get(key) as FormControl;
        this.validatorsService.propertyValidators(formControl, key, type)
      } if (type == 'bool' && key == 'values') {

        propertyForm.addControl(key, new FormArray([]));
        const valuesFormArray = propertyForm.get('values' as string) as FormArray;

        for (let val of value) {
          valuesFormArray.push(new FormControl(val, Validators.required));
        }
      } if (key == 'values') {
        // if(!propertyForm) return;
        propertyForm.addControl('values', new FormArray([]));
        const valuesArray: FormArray = propertyForm.get('values' as string) as FormArray;
        if (type == 'map') {
          for (let [index, values] of value.entries()) {
            valuesArray.push(new FormGroup({}));
            const valuesFormGroup = valuesArray.controls[index] as FormGroup;
            valuesFormGroup.addControl('key', new FormControl(values.key))
            const keyControl = valuesFormGroup.get('key' as string) as FormControl;
            this.validatorsService.propertyValidators(keyControl, 'map_key', 'map');
            valuesFormGroup.addControl('value', new FormControl(values.value))
            const valueControl = valuesFormGroup.get('value' as string) as FormControl;
            this.validatorsService.propertyValidators(valueControl, 'map_value', 'map');

          }
        } else if (type == 'range') {
          for (let [index, values] of value.entries()) {
            propertyForm.addControl('values', new FormArray([]));
            const valuesArray: FormArray = propertyForm.get('values' as string) as FormArray;

            const valuesFormGroup = new FormGroup({});
            for (let [key, value] of Object.entries(values)) {

              if (key == 'key') {
                valuesFormGroup.addControl('key', new FormControl(value)); // shoup exists
                const keyControl = valuesFormGroup.get('key' as string) as FormControl;
                this.validatorsService.propertyValidators(keyControl, 'map_key', 'map');
              }

              if (key == 'value') {
                valuesFormGroup.addControl('value', new FormArray([])); // shoup exists
                const rangeArray = valuesFormGroup.get('value' as string) as FormArray;
                const rangeValues = value as any;
                rangeArray.push(new FormControl(rangeValues[0], [Validators.required, this.validatorsService.minMaxValidator()]));
                rangeArray.push(new FormControl(rangeValues[1], [Validators.required, this.validatorsService.minMaxValidator()]));
              }

            }
            valuesArray.push(valuesFormGroup)
          }
        }

      }


    }
    if (atIndex != undefined) {
      this.formProperties.insert(atIndex, propertyForm)
    } else {
      this.formProperties.push(propertyForm);
      this.selectedFormGroup = propertyForm;
    }
    // this.formProperties.push(propertyForm);
  }

  deleteProperty(property: any) {
    const name = property.get('description').value;
    let i = 0;
    for (let formGroup of this.formProperties.controls) {
      this.genesService.geneChangeEvent({ id: name, event: GENE_EVENT.RESET })
      if (formGroup.get('description')?.value == name) {
        // this.genesService.reset('one', name)
        if (this.selectedFormGroup == this.formProperties.controls[i]) {
          this.selectedFormGroup = this.formProperties.controls[i - 1 < 0 ? 0 : i - 1] as FormGroup;
        }
        this.formProperties.removeAt(i)

        if (this.formProperties.controls?.length == 0) {
          this.selectedFormGroup = new FormGroup({});
        }
      }

      i++;
    }
  }

  swapProperties(prev: number, curr: number) {
    const formArray = this.formProperties as FormArray;
    const currValue = formArray.at(curr)?.value;
    const prevValue = formArray.at(prev)?.value;
    if(curr < prev) {
      formArray.removeAt(prev);
      this.addProperty(prevValue, curr)

    } else {
      formArray.removeAt(curr);
      this.addProperty(currValue, prev)
    }

  }

  geneEvent(formGroup: any) {
    const name = formGroup?.get('description')?.value;
    const gene = formGroup?.get('gene')?.value;
    const length = formGroup?.get('length')?.value;
    const start = formGroup?.get('start')?.value;
    if (gene == '' || length == '' || start == '') {
      this.genesService.geneChangeEvent({ id: name, event: GENE_EVENT.RESET })
      return;
    }
  }

  resetAll() {
    this.setForm = [];
    // this.selectedProperty = {};
  }
}