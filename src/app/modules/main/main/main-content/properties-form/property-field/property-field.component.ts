import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, Self } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from "@angular/forms";
import { GENE_EVENT } from "@app/core/enums/gene.enum";
import { GeneChangeEvent } from "@app/core/models/gene.model";
// import { GENE_CHANGE_EVENT } from '@app/core/models/gene.model'
import { Subscription } from "rxjs";



@Component({
    selector: 'property-field',
    templateUrl: './property-field.component.html',
    styleUrls: ['./property-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PropertyFieldComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PropertyFieldComponent),
            multi: true
        }
    ]
})

export class PropertyFieldComponent implements ControlValueAccessor, OnDestroy {

    constructor() { }
    @Output() valueChanges = new EventEmitter<string>();

    @Input() parentName?: string;
    @Input() label: string = '';
    @Input() title: any = '';
    @Input() displayContent = true;
    @Input() disabledForm: boolean = false;
    @Input() type?: string;
    sub?: Subscription;

    control: FormControl = new FormControl({});


    public onTouched: any = () => { };
    public onChange: any = () => { };

    writeValue(val: any): void {
        val != undefined && this.control.setValue(val, { emitEvent: false });
        this.valueChanges.emit(this.parentName);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
        fn = (val: any) => {
            this.onChange(val)
            this.valueChanges.emit(this.parentName);
        }
        this.control.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn: any): void {
        fn = (val: any) => {
            // console.log('touched', val)
        }
        // console.log("on blur");
        // console.log('touched', fn)
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.control.disable() : this.control.enable();
    }

    // validate(): ValidationErrors | null {
    //     if (this.newChildForm?.invalid) {
    //       return { invalid: true };
    //     } else {
    //       return null;
    //     }
    //   }

    validate(c: AbstractControl): ValidationErrors | null {
        let isValid = null;

        if (this.type == 'range') {
            const control = c as FormControl;
            isValid = this.rangeValidators(control);
        } else if (this.type == 'bool') {
            const control = c as FormControl;
            this.boolValidators(control);
        } else {
            const control = c as FormControl;
            isValid = this.validators(control);
        }

        const control = c as FormControl;
        isValid = this.nameValidator(control);
        // console.log('is valid', isValid)

        return isValid;
    }

    validators(control: FormControl) {
        let validate: any = null;
        const value = control.value;
        console.log('value', value)
        if ((value == '' && value != '0') || value == null) {
            console.log('required field')
            validate = { error: 'Required field' };
        }

        if (validate) {

            setTimeout(() => {
                control.setErrors(validate)
                console.log(validate)
            }, 10)
        }


        return validate;
    }

    nameValidator(control: FormControl) {
        let validate: any = null;

        const name = control.value;


        if (!control.parent?.parent?.controls) return;
        for (const [key, value] of Object.entries(control.parent?.parent?.controls)) {
            if (key == name && value.get('description') != control) {
                control.setErrors({ error: 'Such a name has already been assigned' });
                validate = { error: 'Such a name has already been assigned' };
            }

        }

        if (validate) {

            setTimeout(() => {
                control.setErrors(validate)
                console.log(validate)
            }, 10)
        }
        return validate;
    }


    boolValidators(control: FormControl) {
        let validate: any = null;
        const value = control.value;

        if ((value == '' && value != '0') || value == null) {
            validate = { error: 'Required field' };
        }

        if (validate) {

            setTimeout(() => {
                control.setErrors(validate)
                // console.log(validate)
            }, 10)
        }


        return validate;
    }

    rangeValidators(control: FormControl) {
        let validate: any = null;
        const value = control.value;

        if ((value == '' && value != '0') || value == null) {
            validate = { error: 'Required field' };
        }

        if (validate) {

            setTimeout(() => {
                control.parent?.setErrors(validate)
                // console.log(validate)
            }, 10)
        }


        return validate;
    }


    ngOnDestroy() {
        // this.sub?.unsubscribe();
    }

}