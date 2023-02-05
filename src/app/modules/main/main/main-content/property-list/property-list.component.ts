import { CdkDrag } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ASSET_TYPE } from '@app/core/enums/asset.enum';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { ListItem } from '@app/core/models/asset.model';
import { AssetsService } from '@app/core/services/assets.service';
import { GenesService } from '@app/core/services/genes.service';
import { JSONPreviewService } from '@app/core/services/json-preview.service';
import { ListService } from '@app/core/services/list.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { Subject } from 'rxjs';
import { MAP_PROPERTIES, PROPERTIES } from '../../../../../core/enums/properties.enum';
import { PropertyModel } from '../../../../../core/models/property.model';



@Component({
  selector: 'property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  formGroupName(control: any) {
    return control.get('description')?.value
  }
  get selectedPropertyName() { 
    return this.propertiesService.selectedFormGroup?.get('description')?.value
  }
  getFormGroup(form: any) {
    return form as FormGroup;
  }


  properties?: PropertyModel[];
  propertiesValidity?: ListItem[];

  selectedProperty?: PropertyModel;
  subs = new Subject<void>();

  constructor(private propertiesService: PropertiesService,
    private assetsService: AssetsService,
    private changeDetector: ChangeDetectorRef,
    private genesService: GenesService,
    private listService: ListService,
    private jsonService: JSONPreviewService,) { }

  formProperties = new FormArray(Array());

  ngOnInit(): void {
    this.propertiesService.formProperties = this.formProperties;
    this.properties$();
    this.onChanges$();
  }

  onChanges$() {
    this.formProperties.valueChanges.subscribe(values => {
      this.jsonService.json = values;
    })
  }

  properties$() {
    this.propertiesService.properties$
      .subscribe(properties => {
        this.buildForm(properties);
      })

  }


  // exportJson() {
  //   const form: PropertyModel[] = Object.values(this.propertiesForms.value);

  //   const formValidity: ListItem[] = [];
  //   for (let [key, value] of Object.entries(this.propertiesForms.controls)) {
  //     const d = (value as FormGroup)?.dirty;
  //     const v = (value as FormGroup)?.valid
  //     const valid = v ? true : d ? false : true;
  //     const item: ListItem = { formName: key, valid }
  //     formValidity.push(item);
  //   }
  //   this.propertiesService.formValid = this.propertiesForms.valid;
  //   this.listService.formValidity = formValidity;
  //   this.jsonService.json = form;
  //   this.propertiesService.form = form;
  // }
  buildForm(properties: PropertyModel[]) {
    // const array: FormArray = new FormArray([]);
    this.formProperties.clear();
    for (let property of properties) {
      this.propertiesService.addProperty(property)
      const name = property.description;
      const values = property;
      this.genesService.geneChangeEvent({ values, id: name, event: GENE_EVENT.PAINT });
    }
  }


  onSelectProperty(property: FormGroup) {
    this.propertiesService.selectedFormGroup = property;
    this.listService.showGenes = false;
  }

  deleteProperty(property: any) {
    const name = property.get('description').value;
    let i=0;
    for(let formGroup of this.propertiesService.formProperties.controls) {
      this.genesService.geneChangeEvent({ id: name, event: GENE_EVENT.RESET })
      if(formGroup.get('description')?.value == name) {
            // this.genesService.reset('one', name)
        if(this.propertiesService.selectedFormGroup == this.propertiesService.formProperties.controls[i]) {
          this.propertiesService.selectedFormGroup = this.propertiesService.formProperties.controls[i - 1 < 0 ? 0 : i - 1] as FormGroup;
        }
        this.propertiesService.formProperties.removeAt(i)

        if(this.propertiesService.formProperties.controls?.length == 0) {
          this.propertiesService.selectedFormGroup = new FormGroup({});
        }
      }

      i++;
    }
    // this.propertiesService.selectedFormGroup = this.propertiesService.formProperties.controls[]
    // this.propertiesService.removeProperty(property);
  }

  drop(e: any) {
    if (e.item.data == 'self') {
      this.propertiesService.swapProperties(e.previousIndex, e.currentIndex)
    } else {
      const type = (e.item.data as PROPERTIES)
      const index: number = e.currentIndex;
      // this.propertiesService.addProperty(type, index);
    }
  }

  onSelect(e: any) {
    const file = e.addedFiles[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      var text = reader.result;
      if (!text) return;
      const json = JSON.parse(text as string);
      
      // const properties = [...this.propertiesService.form];
      for (const field of json) {
        this.propertiesService.addProperty(field);
      }
    };
  }


  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
