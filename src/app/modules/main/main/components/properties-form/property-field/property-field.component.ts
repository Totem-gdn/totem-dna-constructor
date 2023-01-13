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
    @Output() valueChanges = new EventEmitter<any>();

    @Input() label: string = '';
    @Input() title = '';
    sub?: Subscription;

    control: FormControl = new FormControl({});


    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        val != undefined && this.control.setValue(val, { emitEvent: false });
    }
    registerOnChange(fn: (_: any) => void): void {
        // console.log("on change", fn);
        fn = (val: any) => {
            this.valueChanges.emit({id: this.title, val});
        }
        this.control.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn: any): void {
        // console.log("on blur");
        
        // this.onTouched = fn;
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