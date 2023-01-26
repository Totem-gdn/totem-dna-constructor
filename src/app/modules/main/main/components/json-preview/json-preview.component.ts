import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { JSONPreviewService } from '@app/core/services/json-preview.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { ValueToStringPipe } from '@app/shared/pipes/value-to-string.pipe';
import { Subject, takeUntil } from 'rxjs';
import { PROPERTIES } from '../../../../../core/enums/properties.enum';
// import { PROPERTIES_LOWERCASE } from '../../enums/properties.enum';
import { PropertyModel } from '../../../../../core/models/property.model';

@Component({
  selector: 'json-preview',
  templateUrl: './json-preview.component.html',
  styleUrls: ['./json-preview.component.scss']
})
export class JSONPreviewComponent implements OnInit, OnDestroy {

  @Input() properties!: PropertyModel[];

  propertyListForDisplay: (string | null)[] = [];
  // jsonForClipboard: string = '';
  jsonUrl: any;
  subs = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private valueToStringPipe: ValueToStringPipe,
    private propertiesService: PropertiesService,
    private jsonService: JSONPreviewService
  ) { }

  ngOnInit(): void {
    this.json$();
  }

  json$() {
    this.jsonService.json$
      .pipe(takeUntil(this.subs))
      .subscribe(json => {
        this.properties = json;
      })

  }

  ngDoCheck(): void {
    this.createJsonForDownload();
    this.propertyListForDisplay = this.properties
      .map((property: PropertyModel) => {
        return this.valueToStringPipe.transform(property);
      })
  }

  jsonForClipboard() {
    return JSON.stringify(this.properties);
  }
  private createJsonForDownload(): void {
    // this.jsonForClipboard = JSON.stringify(this.properties);
    // const blob = new Blob([this.jsonForClipboard], { type: 'text/json' });
    // const url = window.URL.createObjectURL(blob);
    // // const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    // // this.jsonUrl = uri;
    // window.open(url);
  }

  // preparePropertyList(list: PropertyModel[]): PropertyModel[] {
  //   // console.log('list', list)
  //   return list;
  //   // return list.map((property: PropertyModel) => {
  //   //   const modifyProperty = {
  //   //     ...property,
  //   //     type: this.changeTypeForParser(property.type as string)
  //   //   }
  //   //   // delete modifyProperty.active;
  //   //   return modifyProperty;
  //   // })
  // }


  onClickDownload() {
    console.log('download')

    if(!this.propertiesService.formProperties.valid) {
      this.markArrayDirty(this.propertiesService.formProperties);
      return;
    }
    const blob = new Blob([JSON.stringify(this.properties)], { type: 'text/json' });
    // const url = window.URL.createObjectURL(blob);
    // const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    // this.jsonUrl = uri;
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl
    a.download = 'dna.json';
    a.click();
  }

  markGroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      switch (formGroup.get(key)?.constructor.name) {
        case "FormGroup":
          this.markGroupDirty(formGroup.get(key) as FormGroup);
          break;
        case "FormArray":
          this.markArrayDirty(formGroup.get(key) as FormArray);
          break;
        case "FormControl":
          this.markControlDirty(formGroup.get(key) as FormControl);
          break;
      }
    });
  }
  markArrayDirty(formArray: FormArray) {
    formArray.controls.forEach(control => {
      switch (control.constructor.name) {
        case "FormGroup":
          this.markGroupDirty(control as FormGroup);
          break;
        case "FormArray":
          this.markArrayDirty(control as FormArray);
          break;
        case "FormControl":
          this.markControlDirty(control as FormControl);
          break;
      }
    });
  }
  markControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
  }



  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

}
