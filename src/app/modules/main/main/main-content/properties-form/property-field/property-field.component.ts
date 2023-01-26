import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, Self } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from "@angular/forms";
import { ASSET_TYPE } from "@app/core/enums/asset.enum";
import { GENE_EVENT } from "@app/core/enums/gene.enum";
import { GeneChangeEvent } from "@app/core/models/gene.model";
import { PropertiesService } from "@app/core/services/properties.service";
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

export class PropertyFieldComponent implements ControlValueAccessor {

    constructor(private propertiesService: PropertiesService) { }
    @Output() valueChanges = new EventEmitter<string>();

    @Input() parentName?: string;
    // @Input() label: string = '';
    @Input() title: any = '';
    @Input() placeholder: string | null = null;
    // @Input() displayContent = true;
    @Input() disabledForm: boolean = false;
    @Input() type?: string;
    // @Input() range?: boolean = false;
    sub?: Subscription;

    control: FormControl = new FormControl({});


    public onTouched: any = () => { };
    public onChange: any = () => { };

    writeValue(val: any): void {
        val != undefined && this.control.setValue(val, { emitEvent: true });
        // this.valueChanges.emit(this.parentName);
    }
    registerOnChange(fn: any): void {
        // console.log('fn', fn)
        this.onChange = fn;
        fn = (val: any) => {
            console.log('on change')
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
        return this.control.valid ? null : { invalidForm: { valid: false, message: "basicInfoForm fields are invalid" } };
    }


}