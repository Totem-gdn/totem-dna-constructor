import { KeyValue } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Animations } from '@app/core/animations/animations';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { PROPERTIES } from '@app/core/enums/properties.enum';
import { ListItem } from '@app/core/models/asset.model';
import { AssetsService } from '@app/core/services/assets.service';
import { DefaultPropertiesObj } from '@app/core/services/default-properties.service';
import { GenesService } from '@app/core/services/genes.service';
import { JSONPreviewService } from '@app/core/services/json-preview.service';
import { ListService } from '@app/core/services/list.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { ValidatorsService } from '@app/core/services/validators.service';
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
export class PropertiesFormComponent {
  get type() { return this.formGroup.get('type')?.value }
  get description() { return this.formGroup.get('description')?.value }
  formArray(form: any) { return form as any }
  // form(form: any) { return form as any }
  formControl(form: any) { 
    return form as any
   }

  formControlValues(form: any, key: string) { return form.get(key) }

  childrenErrors(form: any)  {

    for(let child of Object.values(form.controls)) {
      const c = child as any

      if(c.errors && c.dirty) {
        if(c.errors.required) return 'Required field';
        if(c.errors.error) return c.errors.error;
      }

      if(c instanceof FormArray) {
        const child1 = c.controls[0] as any;
        const child2 = c.controls[1] as any;
        console.log('children', child1.dirty, child2)
        child2.updateValueAndValidity();
        child1.updateValueAndValidity();
        if(child1.dirty) {
          if(child1.errors?.required) return 'Required field';
          if(child1.errors) {
            return child1.errors.error;
          }
        } else if(child2.dirty) {
          if(!child2.dirty) return null;
          if(child2.errors?.required) return 'Required field';
          if(child2.errors) {

            return child2.errors.error;
          }
        }
      }
    }
    return '';

  }

  getErrors(control: any) {
    // console.log('errors', control)
    if(control.errors.required) return 'Required field';
    if(control.errors.error) return control.errors.error;
    return '';
  }


  formGroup = new FormGroup({});

  constructor(private genesService: GenesService,
    private propertiesService: PropertiesService,
    private changeDetector: ChangeDetectorRef,
    private jsonService: JSONPreviewService,
    private assetsService: AssetsService,
    private listService: ListService,
    private validatorsService: ValidatorsService) { }


  ngOnInit() {
    this.propertiesService.selectedFormGroup$
      .subscribe(formGroup => {
        if (!formGroup) return;
        this.formGroup = formGroup;
      })
  }

  addValues(type: string) {
    let formArray = this.formGroup.get('values' as string) as FormArray;


    if (!formArray) {
      this.formGroup.addControl('values', new FormArray([]))
      formArray = this.formGroup.get('values' as string) as FormArray;
    }

    // Values Form Group
    const valuesFormGroup = new FormGroup({});
    // const validators = 

    if (type != 'range') {

      valuesFormGroup.addControl('key', new FormControl(''));
      const keyControl = valuesFormGroup.get('key' as string) as FormControl;
      this.validatorsService.propertyValidators(keyControl, 'map_key', 'map');

      valuesFormGroup.addControl('value', new FormControl(''));
      const valueControl = valuesFormGroup.get('value' as string) as FormControl;
      this.validatorsService.propertyValidators(valueControl, 'map_value', 'map');

    } else if (type == 'range') {

      valuesFormGroup.addControl('key', new FormControl('')); // shoup exists
      const keyControl = valuesFormGroup.get('key' as string) as FormControl;
      this.validatorsService.propertyValidators(keyControl, 'map_key', 'map');

      let rangeFormArray = valuesFormGroup.get('value' as string) as FormArray;
      if (!rangeFormArray) {
        valuesFormGroup.addControl('value', new FormArray([]));
        rangeFormArray = valuesFormGroup.get('value' as string) as FormArray;
      }
      rangeFormArray.push(new FormControl('',[Validators.required, this.validatorsService.minMaxValidator()] ));
      // const minControl = rangeFormArray.at(0) as FormControl;
      // this.validatorsService.propertyValidators(minControl, 'range_min', 'range');
      rangeFormArray.push(new FormControl('', [Validators.required, this.validatorsService.minMaxValidator()]));
    }
    formArray.push(valuesFormGroup);
    // formGroup.updateValueAndValidity();
  }

  controlValueChanges(formName: string, empty = false) {
    // if (!formName) return;
    if(formName == 'start') this.formGroup.get('length')?.updateValueAndValidity();
    if(formName == 'length') this.formGroup.get('start')?.updateValueAndValidity();

    // const value = this.formGroup.value;
    // this.jsonService.json = value;
    // const parentFormGroup = this.propertiesForms.get(formName);

  const values: FormModel = this.formGroup?.value;
  const name = this.formGroup?.get('description')?.value;
  const gene = this.formGroup?.get('gene')?.value;
  const length = this.formGroup?.get('length')?.value;
  const start = this.formGroup?.get('start')?.value;
  console.log('set')
    if(gene == '' || length == '' || start == '') {
      this.genesService.geneChangeEvent({id: name, event: GENE_EVENT.RESET})
      return;
    }
  

  this.genesService.geneChangeEvent({ values, id: name, event: GENE_EVENT.PAINT });

  }
}
