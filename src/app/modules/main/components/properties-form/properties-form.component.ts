import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GenesService } from '@app/core/services/genes.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { EControls } from '../../enums/controls.enum';
import { EGene } from '../../enums/gene.enum';
import { GeneChangeEvent } from '../../models/gene.model';

@Component({
  selector: 'properties-form',
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss'],
})
export class PropertiesFormComponent implements OnInit, OnDestroy {

  constructor(private genesService: GenesService) {}

  propertiesForm = new FormGroup({});

  title: string = 'Untitled'
  type: string = 'boolean';
  sub!: Subscription;

  onAddForm(formGroup: any) {
    this.propertiesForm.addControl(formGroup.name, formGroup.control);
  }

  ngOnInit(): void {
    this.form$();

  }
  form$() {
    this.sub = this.propertiesForm.valueChanges.subscribe(changes => {
      // this.changesHandler(changes);
    })
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
    this.sub?.unsubscribe();
  }
}
