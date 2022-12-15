import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
})
export class PropertyFormComponent implements OnInit {
  @Input() property?: PropertyModel;
  @Output() updatePropertyInJson: EventEmitter<PropertyModel> = new EventEmitter()
  propertyForm!: UntypedFormGroup;
  propertyIndex!: number;
  valuesArray: any[] = [];
  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    // this.reactiveForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const obj: PropertyModel = {};
    let key: keyof PropertyModel;
    if (this.property) {
      for (key in this.property) {
        (obj[key] as any) = this.property[key]
      }
    }
    this.propertyForm.patchValue({
      ...obj
    })
    console.log('property in form', this.property);
    
  }

  onConfirm(): void {
    // this.propertyForm.get('active')?.setValue(false);
    this.updatePropertyInJson.emit(this.propertyForm.value);
    // this.resetForm(this.propertyForm);
    // this.property = undefined;
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
      active: [''],
      type: [''],
      // values: this.fb.array([]),
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
