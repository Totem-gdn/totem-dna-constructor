import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { PROPERTIES } from '@app/core/enums/properties.enum';
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
})
export class PropertiesFormComponent implements AfterViewChecked {
  getFormControls(form: FormGroup) { 
    // console.log('controls', form.value)
    return form.controls;
  }
  getFormControl(control: any) {
    return control as FormControl;
    
  }
  getFormValue(form: any) {
    return form.value as FormGroup
  }

  constructor(private genesService: GenesService,
    private propertiesService: PropertiesService,
    private changeDetector: ChangeDetectorRef,
    private jsonService: JSONPreviewService) { }

  propertiesForms = new FormGroup({});
  selectedFormName?: string;

  title: string = 'Untitled'
  type?: PROPERTIES = PROPERTIES.BOOLEAN;


  subs = new Subject<void>();

  patchProperty(property: PropertyModel) {
    const props = JSON.parse(JSON.stringify(property))
    // this.propertiesForm.reset();
    this.propertiesForms.patchValue({
      ...props
    })
  }

  ngOnInit(): void {
    this.propertiesService.addProperty(PROPERTIES.BOOLEAN);
    this.selectedProperty$();
    this.properties$();
  }

  // addProperty$() {
  //   this.propertiesService.addProperty$
  //     .pipe(takeUntil(this.subs))
  //     .subscribe(prop => {
  //       console.log('prop', prop)
  //       if(!prop.description) return;

  //       this.propertiesForms.setControl(prop.description, new FormGroup({}))
  //       const formGroup = this.propertiesForms.get(prop.description) as FormGroup;

  //       let form = new DefaultFormModel;
  //       let key: keyof FormModel;

  //       for (key in form) {
  //         form[key] = prop[key];
  //         if(!formGroup) return;
  //         formGroup.setControl(key, new FormControl(prop[key]))
  //       }
  //     })
  // }

  selectedProperty$() {
    this.propertiesService.selectedProperty$
      .pipe(takeUntil(this.subs))
      .subscribe(property => {
        if(!property || !property.description) return;
        this.type = property.type;
        this.selectedFormName = property.description;
        console.log(this.selectedFormName)
      })
  }

  properties$() {
    this.propertiesService.properties$
      .pipe(takeUntil(this.subs))
      .subscribe(properties => {
        console.log('patch property')
        this.propertiesForms = new FormGroup({});
        for (let prop of properties) {
          if(!prop.description) return;

          this.propertiesForms.setControl(prop.description, new FormGroup({}))
          const formGroup = this.propertiesForms.get(prop.description) as FormGroup;

          let form = new DefaultFormModel;
          let key: keyof FormModel;

          for (key in form) {
            form[key] = prop[key];
            if(!formGroup) return;
            formGroup.setControl(key, new FormControl(prop[key]))
          }
          

        }
        this.selectedFormName = properties[0]?.description;
      })
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  controlValueChanges(event: GeneChangeEvent) {
    if(!event.id) return;
    this.jsonService.json = Object.values(this.propertiesForms.value) ;

    if(event.event != GENE_EVENT.LENGTH && event.event != GENE_EVENT.START && event.event != GENE_EVENT.GENE) return;
    this.genesService.geneChangeEvent(event);
  }
}
