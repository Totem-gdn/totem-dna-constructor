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

    // @Output() addForm = new EventEmitter<any>();
    @Output() valueChanges = new EventEmitter<string>();

    @Input() parentName?: string;
    @Input() label: string = '';
    @Input() title: any = '';
    @Input() displayContent = true;
    sub?: Subscription;

    control: FormControl = new FormControl({});


    public onTouched: any = () => { };
    public onChange: any = () => {}

    writeValue(val: any): void {
        // console.log('valie', val)
        // this.control.setValue(val, {emitEvent: true})
        // this.onChange(val)
        val != undefined && this.control.setValue(val, { emitEvent: false });
        console.log('write value', val)
        this.valueChanges.emit(this.parentName);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
        fn = (val: any) => {
            console.log('value', val)
            this.onChange(val)
            this.valueChanges.emit(this.parentName);
        }
        this.control.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn: any): void {
        // console.log("on blur");
        
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.control.disable() : this.control.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.control.valid ? null : { invalidForm: { valid: false, message: "basicInfoForm fields are invalid" } };
    }

    ngOnDestroy() {
        // this.sub?.unsubscribe();
    }

}