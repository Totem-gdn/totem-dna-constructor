import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from "@angular/forms";


@Component({
    selector: 'value-field',
    templateUrl: './value-field.component.html',
    styleUrls: ['./value-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ValueFieldComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ValueFieldComponent),
            multi: true
        }
    ]
})

export class ValueFieldComponent {

    @Output() valueChanges = new EventEmitter<string>();
    @Input() parentName?: string;
    @Input() title: string = 'Value';
    @Input() type!: string;

    // @Input() formArray: FormArray = new Fo;

    control: FormControl = new FormControl();

    public onTouched: any = () => { };
    public onChange: any = () => { };

    writeValue(val: any): void {
        val != undefined && this.control.setValue(val, { emitEvent: false });
        this.valueChanges.emit(this.parentName);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
        fn = (val: any) => {
            // console.log(this.control.errors)
            this.onChange(val)
            this.valueChanges.emit(this.parentName);
        }
        this.control.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.control.disable() : this.control.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        let isValid = null;
        if (this.type == 'range') {
            const control = c as FormControl;
            isValid = this.minMaxValidators(control);
        }
        if(this.type == 'map') {
            const control = c as FormControl;
            isValid = this.mapValidators(control);
        }
        return isValid;
    }

    minMaxValidators(c: FormControl) {
        const rangeFormArray = c.parent as FormArray;

        const length = c.parent?.parent?.parent?.parent?.get('length')?.value;
        const start = c.parent?.parent?.parent?.parent?.get('start')?.value;
        const value = c.value;

        const min = rangeFormArray.controls[0].value;
        const max = rangeFormArray.controls[1].value;

        let validate: any = null;

        if (+min > +max) {
            validate = { error: 'Min greater than max' };
        }
        if (+min == +max) {
            validate = { error: 'Min equal to max' };
        }
        // if(+length + +start > 30) {
        //     console.log(c.parent?.parent?.parent?.get('length'))
        //     console.log('length', +length)
        //     validate = { error: 'Start + length should be not greater than 32' };
        // }
        // console.log('value', value)
        if(value == '' || value == null) {
            validate = { error: 'Required field' };
        }

        // console.log('error', validate)
        

        if(validate) {
            setTimeout(() => {
                rangeFormArray.parent?.setErrors(validate )
            }, 10)
        }

        return validate;
    }

    mapValidators(control: FormControl) {
        let validate: any = null;
        const formGroup = control.parent;
        const value = control.value;


        if((value == '' && value != '0') || value == null) {
            console.log('required map', value)

            validate = { error: 'Required field' };
        }
        if(validate) {
            setTimeout(() => {
                formGroup?.setErrors(validate )
            }, 10)
        }
    }
}