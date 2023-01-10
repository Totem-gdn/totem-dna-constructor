import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PropertiesService } from '@app/core/services/properties.service';
import { ValueToStringPipe } from '@app/shared/pipes/value-to-string.pipe';
import { PROPERTIES } from '../../../../core/enums/properties.enum';
// import { PROPERTIES_LOWERCASE } from '../../enums/properties.enum';
import { PropertyModel } from '../../../../core/models/property.model';

@Component({
  selector: 'json-preview',
  templateUrl: './json-preview.component.html',
  styleUrls: ['./json-preview.component.scss']
})
export class JSONPreviewComponent implements OnInit {
  @Input() properties!: PropertyModel[];

  propertyListForDisplay: (string | null)[] = [];
  jsonForClipboard: string = '';
  jsonUrl: any;;
  constructor(
    private sanitizer: DomSanitizer,
    private valueToStringPipe: ValueToStringPipe,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.properties$();
  }

  properties$() {
    this.propertiesService.properties$
      .subscribe(properties => {
        this.properties = properties;
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

}
