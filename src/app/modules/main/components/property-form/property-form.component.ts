import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BOOLEAN_VALUES, PROPERTIES_LOWERCASE } from '../../enums/properties.enum';
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
  booleanValuesForm!: UntypedFormGroup;
  propertyIndex!: number;
  valuesFormArray!: FormArray;

  values = [
    { value: BOOLEAN_VALUES.NEGATIVE_VALUE, title: 'Negative value' },
    { value: BOOLEAN_VALUES.POSITIVE_VALUE, title: '' },
  ]
  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    // this.reactiveForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetForm(this.propertyForm);
    this.resetForm(this.booleanValuesForm);
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
    // this.propertyForm.valueChanges.subscribe(() => {
    //   console.log(this.propertyForm);

    // })

  }

  onConfirm(): void {
    // this.propertyForm.get('active')?.setValue(false);
    // add boolean values

    if (this.propertyForm.get('type')?.value === PROPERTIES_LOWERCASE.BOOLEAN) {
      this.valuesFormArray.push(this.booleanValuesForm.get('negative_value'));
      this.valuesFormArray.push(this.booleanValuesForm.get('positive_value'));
    }

    if (!this.propertyForm.value.values.length) {
      delete this.propertyForm.value.values;
    }
    console.log(this.propertyForm);


    this.updatePropertyInJson.emit(this.propertyForm.value);
    // this.resetForm(this.propertyForm);
    // this.property = undefined;
  }

  onClearField(field: string, typeForm?: string): void {
    if (typeForm === 'booleanValuesForm') {
      this.booleanValuesForm.get(field)?.reset();
    } else {
      this.propertyForm.get(field)?.reset();
    }

  }

  onAddValue(): void {
    this.valuesFormArray.push(this.createValue())
  }

  ondeleteValue(index: number): void {
    this.valuesFormArray.removeAt(index);
  }

  private createValue(): FormGroup {
    return this.fb.group({
      value: [''],
      valueKey: ['']
    })
  }

  private reactiveForm(): void {
    this.propertyForm = this.fb.group({
      description: ['', Validators.required],
      id: ['', Validators.required],
      gene: ['', [Validators.required, Validators.min(0)]],
      offset: ['', [Validators.required, Validators.min(0)]],
      length: ['', [Validators.required, Validators.min(0)]],
      active: [''],
      type: [''],
      values: this.fb.array([]),
    })
    this.valuesFormArray = this.propertyForm.get('values') as FormArray;

    this.booleanValuesForm = this.fb.group({
      negative_value: ['', Validators.required],
      positive_value: ['', Validators.required],
    })
  }

  private resetForm(form: UntypedFormGroup): void {
    if (form) {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.controls[key].setErrors(null)
      });
    }
  }
}
