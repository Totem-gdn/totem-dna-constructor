import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  jsonForClipboard: string = '';
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
    this.propertyListForDisplay = this.preparePropertyList(this.properties)
      .map((property: PropertyModel) => {
        return this.valueToStringPipe.transform(property);
      })
  }

  private createJsonForDownload(): void {
    this.jsonForClipboard = JSON.stringify(this.preparePropertyList(this.properties));
    const blob = new Blob([this.jsonForClipboard], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.jsonUrl = uri;
  }

  preparePropertyList(list: PropertyModel[]): PropertyModel[] {
    // console.log('list', list)
    return list;
    // return list.map((property: PropertyModel) => {
    //   const modifyProperty = {
    //     ...property,
    //     type: this.changeTypeForParser(property.type as string)
    //   }
    //   // delete modifyProperty.active;
    //   return modifyProperty;
    // })
  }

  private changeTypeForParser(type: string): any {
    switch (type) {
      case PROPERTIES.BOOLEAN:
        return 'bool'
      case PROPERTIES.ENUM:
        return 'map'
      case PROPERTIES.INTEGER:
        return 'int'
      default:
        return type
    }
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

}
