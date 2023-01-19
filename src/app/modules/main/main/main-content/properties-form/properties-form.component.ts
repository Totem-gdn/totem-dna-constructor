import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
})
export class PropertiesFormComponent implements AfterViewChecked {
  formValid(form: FormGroup) {
   return !Object.keys(form.controls)?.length;
  }
  getFormControls(form: FormGroup) { 
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
        if(!property || !property.description) return;
        this.type = property.type;
        this.selectedFormName = property.description;
      })
  }

  properties$() {
    // this.propertiesService.setProperties$
    this.propertiesService.setForm$
      .pipe(takeUntil(this.subs))
      .subscribe(properties => {
        this.propertiesForms = new FormGroup({});

        for (let prop of properties) {
          if(!prop.description) return;

          this.propertiesForms.addControl(prop.description, new FormGroup({}))
          const formGroup = this.propertiesForms.get(prop.description) as FormGroup;

          for(const [key, value] of Object.entries(prop)) {
            
            if(!formGroup) return;
            // this.controlValueChanges(key);
            formGroup.addControl(key, new FormControl(value));
          }

        }
        this.exportJson();
        
        this.selectedFormName = properties[0]?.description;
      })
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  controlValueChanges(formName: string, empty = false) {
    if(!formName) return;
    
    const values: FormModel = this.propertiesForms.get(formName)?.value;
    this.exportJson();
    // console.log('props', this.propertiesService.properties)
    this.genesService.geneChangeEvent({values, id: formName, event: GENE_EVENT.PAINT});
  }

  exportJson() {
    const form: PropertyModel[] = Object.values(this.propertiesForms.value);
    this.jsonService.json = form;
    this.propertiesService.form = form;
  }
}
