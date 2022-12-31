import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GenesService } from '@app/core/services/genes.service';
import { PropertiesService } from '@app/core/services/properties.service';
import * as _ from 'lodash';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { EControls } from '../../enums/controls.enum';
import { EGene } from '../../enums/gene.enum';
import { FormModel } from '../../models/form.model';
import { GeneChangeEvent } from '../../models/gene.model';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'properties-form',
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss'],
})
export class PropertiesFormComponent implements OnInit, OnDestroy {

  constructor(private genesService: GenesService,
              private propertiesService: PropertiesService) {}

  propertiesForm = new FormGroup({});

  title: string = 'Untitled'
  type: string = 'boolean';
  subs = new Subject<void>();

  onAddForm(formGroup: any) {
    this.propertiesForm.addControl(formGroup.name, formGroup.control);
  }

  ngOnInit(): void {
    this.form$();
    this.selectedProperty$();
  }
  form$() {
    this.propertiesForm.valueChanges
      .pipe(takeUntil(this.subs))
      .subscribe(changes => {
        this.updateProperty(changes);
    })
  }
  selectedProperty$() {
    this.propertiesService.selectedProperty$
      .pipe(takeUntil(this.subs))
      .subscribe(property => {
        if(!property) return;
        this.patchProperty(property);
      })
  }

  updateProperty(form: FormModel) {
    const property = this.propertiesService.selectedProperty;

    const obj: PropertyModel = {};
    let key: keyof PropertyModel;

    for(key in property) {
      // (obj[key] as any) = form[key];
    }
    
  }
  patchProperty(property: PropertyModel) {
    this.propertiesForm.reset();
    const form: FormModel = this.propertiesForm.value;

    const obj: FormModel = {};
    let key: keyof FormModel;
    for(key in form) {
      (obj[key] as any) = property[key]
    }
    this.propertiesForm.patchValue({
      ...obj
    })
    console.log(this.propertiesForm.value);
  }

  controlValueChanges(control: any) {
    const name = control.name;
    const value = control.value;
    
    
    if(name == EControls.GENE) {
      const event: GeneChangeEvent = {event: EGene.GENE, value};
      this.genesService.geneChangeEvent(event);
    }
    if(name == EControls.OFFSET) {
      const event: GeneChangeEvent = {event: EGene.OFFSET, value};
      this.genesService.geneChangeEvent(event);
    }
    if(name == EControls.LENGTH) {
      const event: GeneChangeEvent = {event: EGene.LENGTH, value};
      this.genesService.geneChangeEvent(event);
    }
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
