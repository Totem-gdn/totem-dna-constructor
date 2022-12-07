import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyFormComponent implements OnInit {
  @Input() property?: PropertyModel;
  propertyForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);

    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  reactiveForm() {
    this.propertyForm = this.fb.group({
      description: ['', Validators.required],
    })
  }


}
