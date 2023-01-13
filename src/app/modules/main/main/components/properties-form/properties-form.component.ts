import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { PROPERTIES } from '@app/core/enums/properties.enum';
import { DefaultPropertiesObj } from '@app/core/services/default-properties.service';
import { GenesService } from '@app/core/services/genes.service';
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
export class PropertiesFormComponent {
  // get controlType() { return FormControl}

  constructor(private genesService: GenesService,
    private propertiesService: PropertiesService) { }

  propertiesForms = new FormGroup({});
  selectedForm = new FormGroup({});

  title: string = 'Untitled'
  type?: PROPERTIES = PROPERTIES.BOOLEAN;


  @Input() set property(prop: PropertyModel) {
    this.patchProperty(prop);
  }

  subs = new Subject<void>();

  patchProperty(property: PropertyModel) {
    const props = JSON.parse(JSON.stringify(property))
    // this.propertiesForm.reset();
    // this.propertiesForm.patchValue({
    //   ...props
    // })
  }

  // onAddForm(formGroup: any) {
  //   this.propertiesForm.addControl(formGroup.name, formGroup.control);
  // }

  ngOnInit(): void {
    this.form$();
    this.selectedProperty$();
    this.properties$();
  }

  form$() {
    // this.propertiesForm.valueChanges
    //   .pipe(takeUntil(this.subs))
    //   .subscribe(changes => {
    //   })
  }

  selectedProperty$() {
    this.propertiesService.selectedProperty$
      .pipe(takeUntil(this.subs))
      .subscribe(property => {
        if(!property || !property.description) return;

        this.type = property.type;
        this.selectedForm = new FormGroup({})
        this.selectedForm = this.propertiesForms.get(property.description) as FormGroup;

        console.log(this.selectedForm.get('id'))
      })
  }

  properties$() {
    this.propertiesService.properties$
      .pipe(takeUntil(this.subs))
      .subscribe(properties => {
        // this.propertiesForms.setControl(new FormGroup('eher'));
        this.propertiesForms = new FormGroup({});
        for (let prop of properties) {
          if(!prop.description) return;
          // const form = 
          this.propertiesForms.setControl(prop.description, new FormGroup({}))

          const formGroup = this.propertiesForms.get(prop.description) as FormGroup;
          let form = new DefaultFormModel;
          let key: keyof FormModel;

          for (key in form) {
            form[key] = prop[key];
            if(!formGroup) return;
            formGroup.setControl(key, new FormControl(prop[key]))
          }
          this.selectedForm = formGroup as FormGroup;
          // formGroup.set
          // this.propertiesForms.addControl('eher', new FormGroup('eher'));

          // const propValues = this.propertiesForms.get(prop.description);

          // let form: FormModel = {};
          // for(let key in form) {
          //   console.log(key)
          // }
          // for(let key of keyof FormModel)
          // for(let value in prop) {
          //   let key: keyof FormModel;
            
          // }
        }
      })
  }

  controlValueChanges(control: any) {
    const id = this.selectedForm.get('description')?.value;

    const e = control.id;
    const val = control.val;
    if(e != 'start' && e != 'length' && e != 'gene') return;

    const event: GeneChangeEvent = {id, event: e, value: val};
    this.genesService.geneChangeEvent(event);
  }
}
