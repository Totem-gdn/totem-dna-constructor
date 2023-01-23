import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { AbstractControl, FormArray, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";


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
    @Input() title:string = 'Value';

    // @Input() formArray: FormArray = new Fo;

    control: FormControl = new FormControl();

    public onTouched: any = () => {};
    public onChange: any = () => {};

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
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.control.disable() : this.control.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.control.valid ? null : { invalidForm: { valid: false, message: "basicInfoForm fields are invalid" } };
    }
}