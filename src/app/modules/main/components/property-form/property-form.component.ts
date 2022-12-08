import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PropertyModel, PropertyUpdateModel } from '../../models/property.model';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
})
export class PropertyFormComponent implements OnInit {
  @Input() property?: PropertyModel;
  @Output() updatePropertyInJson: EventEmitter<PropertyUpdateModel> = new EventEmitter()
  propertyForm!: UntypedFormGroup;
  propertyIndex!: number;
  constructor(
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.resetForm(this.propertyForm)
  }

  onConfirm(): void {
    this.updatePropertyInJson.emit(this.propertyForm.value);
    this.resetForm(this.propertyForm);
  }

  onClearField(field: string): void {
    this.propertyForm.get(field)?.reset();
  }

  reactiveForm(): void {
    this.propertyForm = this.fb.group({
      description: ['', Validators.required],
      id: ['', Validators.required],
      gene: ['', Validators.required],
      offset: ['', Validators.required],
      lenght: ['', Validators.required],
    })
  }

  resetForm(form: UntypedFormGroup): void {
    if (form) {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.controls[key].setErrors(null)
      });
    }
  }


}
