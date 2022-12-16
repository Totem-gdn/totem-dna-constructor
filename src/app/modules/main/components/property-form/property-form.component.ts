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
  disableLength: boolean = false;
  type!: PROPERTIES_LOWERCASE;

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
    this.resetFormArray(this.valuesFormArray);

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
    this.type = this.propertyForm.get('type')?.value;
    this.setReadOnlyLengthValue(this.propertyForm.get('type')?.value);
  }

  onConfirm(): void {
    if (this.propertyForm.get('type')?.value === PROPERTIES_LOWERCASE.BOOLEAN) {
      this.valuesFormArray.push(this.booleanValuesForm.get('negative_value'));
      this.valuesFormArray.push(this.booleanValuesForm.get('positive_value'));
    }

    if (!this.propertyForm.value.values.length) {
      delete this.propertyForm.value.values;
    }
    // console.log(this.propertyForm.value);

    this.updatePropertyInJson.emit(this.propertyForm.value);
  }

  onClearField(field: string, typeForm?: string): void {
    switch (typeForm) {
      case 'booleanValuesForm':
        this.booleanValuesForm.get(field)?.reset();
        break;
      // case 'enumValuesForm':
      //   this.enumValuesForm.get(field)?.reset();
      //   break;

      default:
        this.propertyForm.get(field)?.reset();
        break;
    }

  }

  onAddValue(): void {
    this.valuesFormArray.push(this.createValue(this.type));
  }

  ondeleteValue(index: number): void {
    this.valuesFormArray.removeAt(index);
  }

  private createValue(type: PROPERTIES_LOWERCASE): FormGroup {
    switch (type) {
      case PROPERTIES_LOWERCASE.ENUM:
        return this.fb.group({
          value: ['', Validators.required],
          key: ['', Validators.required]
        })
      case PROPERTIES_LOWERCASE.RANGE:
        return this.fb.group({
          min: ['', Validators.required],
          max: ['', Validators.required],
          key: ['', Validators.required],
        })
      default:
        return this.fb.group({})
    }

  }

  private setReadOnlyLengthValue(type: PROPERTIES_LOWERCASE): void {
    switch (type) {
      case PROPERTIES_LOWERCASE.BOOLEAN:
        this.propertyForm.get('length')?.setValue(1);
        this.disableLength = true;
        // this.propertyForm.get('length')?.disable();
        break;
      case PROPERTIES_LOWERCASE.COLOR:
        this.propertyForm.get('length')?.setValue(24);
        // this.propertyForm.get('length')?.disable();
        this.disableLength = true;
        break;
      default:
        this.disableLength = false;
        break;
    }
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

    // this.enumValuesForm = this.fb.group({
    //   value: ['', Validators.required],
    //   key: ['', Validators.required]
    // })
  }

  private resetForm(form: UntypedFormGroup): void {
    if (form) {
      form.reset();
      Object.keys(form.controls).forEach(key => {
        form.controls[key].setErrors(null);
        form.controls[key].enable();
      });
    }
  }

  private resetFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

}
