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

export class PropertyFieldComponent implements ControlValueAccessor, OnDestroy {

    constructor(private propertiesService: PropertiesService) { }
    @Output() valueChanges = new EventEmitter<string>();

    @Input() parentName?: string;
    @Input() label: string = '';
    @Input() title: any = '';
    @Input() displayContent = true;
    @Input() disabledForm: boolean = false;
    @Input() type?: string;
    @Input() range?: boolean = false;
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
        } else if (this.type == 'map') {
            const control = c as FormControl;
            isValid = this.mapValidators(control);
        } else if (this.type == 'bool') {
            const control = c as FormControl;
            isValid = this.boolValidators(control);
        } else {
            const control = c as FormControl;
            isValid = this.validators(control);
        }

        const control = c as FormControl;
        isValid = this.nameValidator(control);
        // console.log('is valid', isValid)

        return isValid;
    }

    sharedValidator(c: FormControl) {
        let validate: any = null;
        // return ;
        const length = c.parent?.get('length')?.value;
        const start = c.parent?.get('start')?.value;
        const gene = c.parent?.get('gene')?.value;
        // console.log('parent', c.parent)
        // console.log(length, start, gene)
        // return;


        if((length != '' && start != '')) {
            if(+length + +start > 32) {
                console.log('length', length, 'start', start, length + start > 32)
                validate = { error: 'Length + start should not be greater then 32' };
            }



        }
        if(gene != '') {
            const assetType = this.propertiesService.assetType;
            const maxGene = assetType == ASSET_TYPE.AVATAR ? 23 : ASSET_TYPE.ITEM ? 15 : 7;
            if(gene > maxGene) {

                validate = { error: `Gene should not be greater then ${maxGene}` };
            }
        }

        // if (validate) {
        //     setTimeout(() => {
        //         console.log('control parent', c.parent)
        //         c.setErrors(validate)
        //         if(this.range) c.setErrors(validate)
        //     }, 10)
        // }
        return validate;
    }

    mapValidators(control: FormControl) {
        let validate: any = null;
        const value = control.value;
        // console.log('map value', value)
        validate = this.sharedValidator(control.parent as any);
        if ((value == '' && value != '0') || value == null) {
            console.log('required map', value)
            validate = { error: 'Required field' };
        }

        if (validate) {
            setTimeout(() => {
                console.log('control parent', control.parent)
                control.setErrors(validate)
                if(this.range) control?.parent?.setErrors(validate)
            }, 10)
        }

        return validate;
    }

    validators(control: FormControl) {
        let validate: any = null;
        const value = control.value;
        validate = this.sharedValidator(control.parent as any);

        if ((value == '' && value != '0') || value == null) {
            validate = { error: 'Required field' };
        }

        if (validate) {
            // control.setErrors(validate)
            //     console.log(validate)
            setTimeout(() => {
                control.setErrors(validate)
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
            }, 10)
        }
        validate = this.sharedValidator(control);

        return validate;
    }


    boolValidators(control: FormControl) {
        let validate: any = null;
        const value = control.value;
        validate = this.sharedValidator(control.parent as any);

        if ((value == '' && value != '0') || value == null) {
            validate = { error: 'Required field' };
        }

        if (validate) {

            setTimeout(() => {
                control.setErrors(validate)
                // console.log(validate)
            }, 10)
        }
        // validate = this.sharedValidator(control);


        return validate;
    }

    rangeValidators(control: FormControl) {
        let validate: any = null;
        const value = control.value;
        validate = this.sharedValidator(control.parent as any);

        if ((value == '' && value != '0') || value == null) {
            validate = { error: 'Required field' };
        }

        if (validate) {
            setTimeout(() => {
                console.log('control parent', control.parent)
                control.setErrors(validate)
                if(this.range) control?.parent?.setErrors(validate)
            }, 10)
        }
        // validate = this.sharedValidator(control);


        return validate;
    }


    ngOnDestroy() {
        // this.sub?.unsubscribe();
    }

}