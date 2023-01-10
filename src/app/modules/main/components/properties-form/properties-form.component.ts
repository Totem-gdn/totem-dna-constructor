import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { PROPERTIES } from '@app/core/enums/properties.enum';
import { DefaultPropertiesObj } from '@app/core/services/default-properties.service';
import { GenesService } from '@app/core/services/genes.service';
import { PropertiesService } from '@app/core/services/properties.service';
import * as _ from 'lodash';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { EControls } from '../../../../core/enums/controls.enum';
// import { EGene } from '../../../../core/enums/gene.enum';
import { FormModel } from '../../../../core/models/form.model';
import { GeneChangeEvent } from '../../../../core/models/gene.model';
import { PropertyModel } from '../../../../core/models/property.model';

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
  type?: PROPERTIES = PROPERTIES.BOOLEAN;
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
    })
  }

  selectedProperty$() {
    this.propertiesService.selectedProperty$
      .pipe(takeUntil(this.subs))
      .subscribe(property => {
        if(!property) return;
        this.type = property.type;
        this.patchProperty(property);
      })
  }

  patchProperty(property: PropertyModel) {
    const props = JSON.parse(JSON.stringify(property))

    this.propertiesForm.reset();
    this.propertiesForm.patchValue({
      ...props
    })
  }

  controlValueChanges(control: any) {
    this.updateSelectedProperty(control);
    // const name = control.name;
    const value = control.value;
    const selectedProperty = this.propertiesService.selectedProperty;
    const id = selectedProperty.description;
    const eventName = (control.name as GENE_EVENT);

    const event: GeneChangeEvent = { event: eventName, value, id};
    this.genesService.geneChangeEvent(event);
    
    // if(id == EControls.GENE) {
    //   const event: GeneChangeEvent = {event: GENE_EVENT.GENE, value, id};
    //   this.genesService.geneChangeEvent(event);
    // }
    // if(id == EControls.START) {
    //   const event: GeneChangeEvent = {event: GENE_EVENT.START, value, id};
    //   this.genesService.geneChangeEvent(event);
    // }
    // if(id == EControls.LENGTH) {
    //   const event: GeneChangeEvent = {event: GENE_EVENT.LENGTH, value, id};
    //   this.genesService.geneChangeEvent(event);
    // }
  }

  updateSelectedProperty(control: any) {
    this.propertiesService.updateSelectedPropertyById(control);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
