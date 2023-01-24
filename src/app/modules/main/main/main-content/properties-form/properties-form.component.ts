import { KeyValue } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Animations } from '@app/core/animations/animations';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { PROPERTIES } from '@app/core/enums/properties.enum';
import { AssetsService } from '@app/core/services/assets.service';
import { DefaultPropertiesObj } from '@app/core/services/default-properties.service';
import { GenesService } from '@app/core/services/genes.service';
import { JSONPreviewService } from '@app/core/services/json-preview.service';
import { PropertiesService } from '@app/core/services/properties.service';
import * as _ from 'lodash';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { EControls } from '../../../../../core/enums/controls.enum';
// import { EGene } from '../../../../core/enums/gene.enum';
import { DefaultFormModel, FormModel } from '../../../../../core/models/form.model';
import { GeneChangeEvent } from '../../../../../core/models/gene.model';
import { PropertyModel } from '../../../../../core/models/property.model';

@Component({
  selector: 'properties-form',
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss'],
  animations: [
    Animations.animations
  ]
})
export class PropertiesFormComponent implements AfterViewChecked {

  getType(type: string | undefined) {
    console.log(type);
    return type;
  }
  getAny(any: any) {
    return any;
  }
  zero() { return 0 }
  sortingOrder = ['id', 'description']
  customSort = (a: KeyValue<string, any>, b: KeyValue<string, any>): any => {
    return this.sortingOrder.slice().indexOf(b.key) - this.sortingOrder.slice().indexOf(a.key);
  }

  formValid(form: FormGroup) {
    return !Object.keys(form.controls)?.length;
  }
  getFormType(form: FormGroup) {
    // console.log('form', form.value.description)
    return form.value.type;
  }
  getFormArray(formArray: any) {
    // console.log('form array', formArray.controls)
    return formArray;
  }
  getFormControls(form: FormGroup) {
    return form.controls;
  }
  getFormControl(control: any, hint = '') {
    return control as FormControl;

  }
  getFormValue(form: any) {
    return form.value as FormGroup
  }

  constructor(private genesService: GenesService,
    private propertiesService: PropertiesService,
    private changeDetector: ChangeDetectorRef,
    private jsonService: JSONPreviewService,
    private assetsService: AssetsService) { }

  propertiesForms = new FormGroup({});
  selectedFormName?: string;

  title: string = 'Untitled'
  type?: PROPERTIES = PROPERTIES.BOOLEAN;


  subs = new Subject<void>();

  patchProperty(property: PropertyModel) {
    const props = JSON.parse(JSON.stringify(property))
    this.propertiesForms.patchValue({
      ...props
    })
  }

  ngOnInit(): void {
    // this.propertiesService.addProperty(PROPERTIES.BOOLEAN);
    this.selectedProperty$();
    this.properties$();
  }

  selectedProperty$() {
    this.propertiesService.selectedProperty$
      .pipe(takeUntil(this.subs))
      .subscribe(property => {
        if (!property || !property.description) return;
        setTimeout(() => {
          this.type = property.type;
          this.selectedFormName = property.description;
        }, 10)
      })
  }

  addProperty(formName: string, type: string) {

    const formGroup = this.propertiesForms.get(formName) as FormGroup;

    let formArray = formGroup.get('values') as FormArray;
    if(!formArray) {
      formGroup.addControl('values', new FormArray([]))
      formArray = formGroup.get('values') as FormArray;
    }
    console.log('array', formArray)

    // Values Form Group
    const valuesFormGroup = new FormGroup({});

    // valuesFormGroup.addControl(key, new FormControl(value));

    if (type != 'range') {
      valuesFormGroup.addControl('key', new FormControl(''));
      valuesFormGroup.addControl('value', new FormControl(''));
    } else {

      valuesFormGroup.addControl('key', new FormControl('')); // shoup exists
      valuesFormGroup.get('key')?.addValidators([Validators.required])
      
      let rangeFormArray = valuesFormGroup.get('value' as string) as FormArray;
      if(!rangeFormArray) {
        valuesFormGroup.addControl('value', new FormArray([]));
        rangeFormArray = valuesFormGroup.get('value' as string) as FormArray;
      }
      rangeFormArray.push(new FormControl(''));
      rangeFormArray.push(new FormControl(''));





      console.log(rangeFormArray)

      // console.log('range value', value)
    }
    formArray.push(valuesFormGroup);
  }





  properties$() {
    // this.propertiesService.setProperties$
    this.propertiesService.setForm$
      .pipe(takeUntil(this.subs))
      .subscribe(properties => {
        this.propertiesForms = new FormGroup({});

        for (let prop of properties) {
          if (!prop.description) return;


          this.propertiesForms.setControl(prop.description, new FormGroup({}))
          const formGroup = this.propertiesForms.get(prop.description) as FormGroup;

          for (const [formGroupKey, formGroupValue] of Object.entries(prop)) {
            if (!formGroup) return;
            const type = prop.type;

            if (formGroupKey != 'values') {

              formGroup.addControl(formGroupKey, new FormControl(formGroupValue));

            } else if (type == 'bool') {
              // Boolean
              formGroup.addControl(formGroupKey, new FormArray([]));
              const valuesFormArray = formGroup.get('values') as FormArray;

              for (let value of formGroupValue) {
                valuesFormArray.push(new FormControl(value));
              }

            } else {
              console.log('formGroupKey', formGroupKey)
              formGroup.addControl(formGroupKey, new FormArray([]));
              const valuesFormArray = formGroup.get('values') as FormArray;

              for (let values of formGroupValue) {
                // Values Form Group
                const valuesFormGroup = new FormGroup({});

                for (const [key, value] of Object.entries(values)) {
                  // valuesFormGroup.addControl(key, new FormControl(value));

                  if (type != 'range' || key != 'value') {
                    valuesFormGroup.addControl(key, new FormControl(value));
                  } else {
                    const rangeValues = value as string[];
                    // console.log('key-value',key, value)
                    valuesFormGroup.addControl(key, new FormArray([]));

                    const rangeFormArray = valuesFormGroup.get((key as string)) as FormArray;
                    // console.log(rangeFormArray)
                    for (let [index, rangeValue] of rangeValues.entries()) {
                      
                      rangeFormArray.push(new FormControl(rangeValue));
                     
                      // console.log()
                    }

                    // console.log('range value', value)
                  }
                }
                valuesFormArray.push(valuesFormGroup);
              }
            }
            // console.log('form', this.propertiesForms.value)
          }

        }
        this.exportJson();

        this.selectedFormName = properties[0]?.description;
      })
  }

  addValuesForm(form: FormGroup) {
    form.addControl('key', new FormControl(''));
    form.addControl('value', new FormControl(''));
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  controlValueChanges(formName: string, empty = false) {
    if (!formName) return;

    const values: FormModel = this.propertiesForms.get(formName)?.value;
    this.exportJson();
    this.genesService.geneChangeEvent({ values, id: formName, event: GENE_EVENT.PAINT });
  }

  rangeValueChanges(parentName: string, formArray: FormArray, type: 'range' | 'map') {
    let minValue: number | undefined = undefined;
    // return;
    if (type == 'map') {
      minValue = 0;
      for (let formGroup of formArray.controls) {
        const controlValue = formGroup.get('value')?.value;
        if (minValue == undefined) return;
        if (controlValue > minValue) minValue = controlValue;
      }
    }
    if (type == 'range') {
      minValue = 0;

      for (let formGroup of formArray.controls) {
        const array = formGroup.get('value') as FormArray;
        for (let valueControl of array.controls) {
          const value = valueControl.value;
          if (minValue == undefined) return;

          if (value > minValue) minValue = value;
        }
      }
    }

    if (minValue != undefined && minValue != 0) {
      const length = Math.ceil(Math.log2(minValue));

      const parentFormGroup = this.propertiesForms.get(parentName) as FormGroup;
      const lengthControl = parentFormGroup?.get('length') as FormControl;
      lengthControl.patchValue(length);
    }

    const values: FormModel = this.propertiesForms.get(parentName)?.value;
    this.exportJson();
    this.genesService.geneChangeEvent({ values, id: parentName, event: GENE_EVENT.PAINT });
  }

  exportJson() {
    const form: PropertyModel[] = Object.values(this.propertiesForms.value);
    this.jsonService.json = form;
    this.propertiesService.form = form;
  }
}
