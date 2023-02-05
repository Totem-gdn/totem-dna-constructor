import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { range } from "lodash";
import { ASSET_TYPE } from "../enums/asset.enum";
import { AssetsService } from "./assets.service";
import { PropertiesService } from "./properties.service";

// enum Names {
//     'name', 
//     'length',
//     'start',
//     'gene',
//     'map_key',
//     'map_value'
// }

@Injectable({providedIn: 'root'})


export class ValidatorsService {

    constructor(
                private assetsService: AssetsService) {}

    propertyValidators(formControl: FormControl, name: string = '', type: string = '' ) {
        const validators: ValidatorFn[] = [];
    
        validators.push(Validators.required)
    
        if(name == 'length') validators.push(this.lengthValidator());
        if(name == 'start') validators.push(this.startValidator());
            
        
        if(name == 'gene') validators.push(this.geneOverflowValidator());

        if(((name == 'map_key' || name == 'map_value')) && type == 'map') {
            if(name == 'map_value') {
                validators.push(this.mapValueValidator())
            }
            validators.push(this.mapGeneOverflow())
        }
        if(name == 'description') {
            validators.push(this.nameValidator())
        }

        formControl.setValidators(validators)
      }

      nameValidator(): ValidatorFn {
        return (selectedControl: AbstractControl): { [key: string]: any } | null => {
            const selectedName = selectedControl.parent?.get('description')?.value;
            const properties = selectedControl.parent?.parent as FormArray;

            for(let formGroup of properties.controls) {
                const control = formGroup.get('description');
                if(selectedControl == control) continue;

                const name = control?.value;
                if(selectedName == name) return { error: 'Such name is already assigned'};
            }
            return null;
          }
      }

      mapGeneOverflow(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            
            const formGroup = control.parent;
            const length = formGroup?.get('length')?.value;
            const start = formGroup?.get('start')?.value;
            
            if((length && length != '') && ( start && start != '')) {
              if(+length + +start > 32) return { error: 'Length + start should not be greater then 32' };
            }
            return null;
          }
      }

      mapValueValidator(): ValidatorFn {

        return (c: AbstractControl): ValidationErrors | null => {
            const value = c.value;

            let maximum: number = 0;
            if(value != '') maximum = +value;
            const length = c.parent?.parent?.parent?.get('length');
            const genesOccupied = maximum != 0 ? Math.ceil(Math.log2(maximum)) : 0;
            length?.setValue(genesOccupied)

            return null;
        }
      }

      minMaxValidator(): ValidatorFn {

        return (c: AbstractControl): ValidationErrors | null => {
            const rangeFormArray = c.parent as FormArray;
            if(!rangeFormArray) return null;

            const min = rangeFormArray.controls[0].value;
            const max = rangeFormArray.controls[1].value;

            let maximum: number = 0;
            if(min != '') maximum = +min;
            if(max != '') maximum = +max;
            const length = c.parent?.parent?.parent?.parent?.get('length');
            const genesOccupied = maximum != 0 ? Math.ceil(Math.log2(maximum)) : 0;
            length?.setValue(genesOccupied)
    

    
            if(max == '' || min == '') return null;

            if (+min > +max) {
                return { error: 'Min greater than max' };
            }
            if (+min == +max) {
                return { error: 'Min equal to max' };
            }


            // this.control?.parent?.get('length')?.setValue(genesOccupied)

            return null;
        }
      }
    
      lengthValidator(): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {

          const formGroup = control.parent;
          const length = formGroup?.get('length')?.value;
          const start = formGroup?.get('start')?.value;
        //   formGroup?.get('length')?.updateValueAndValidity();
        //   if(!formGroup?.get('start')?.errors) formGroup?.get('start')?.updateValueAndValidity();

          
          if((length && length != '') && ( start && start != '')) {
            if(+length + +start > 32) return { error: 'Length + start should not be greater then 32' };
          }
          return null;
        }
      }
      startValidator(): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {

          const formGroup = control.parent;
          const length = formGroup?.get('length')?.value;
          const start = formGroup?.get('start')?.value;
        //   formGroup?.get('length')?.updateValueAndValidity();
        //   if(!formGroup?.get('start')?.errors) formGroup?.get('start')?.updateValueAndValidity();

          
          if((length && length != '') && ( start && start != '')) {
            if(+length + +start > 32) return { error: 'Length + start should not be greater then 32' };
          }
          return null;
        }
      }
    
      geneOverflowValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          
          const gene = control?.value;

          
    
          const assetType = this.assetsService.assetType;
          const maxGene = assetType == ASSET_TYPE.AVATAR ? 23 : ASSET_TYPE.ITEM ? 15 : 7;
    
          if(gene && gene != '') {
            if(gene > maxGene) return { error: `Gene should not be greater then ${maxGene}` };
          }
    
          return null;
        }
      }
}