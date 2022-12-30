import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ValueToStringPipe } from '@app/shared/pipes/value-to-string.pipe';
import { PROPERTIES } from '../../enums/properties.enum';
// import { PROPERTIES_LOWERCASE } from '../../enums/properties.enum';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'json-preview',
  templateUrl: './json-preview.component.html',
  styleUrls: ['./json-preview.component.scss']
})
export class JSONPreviewComponent implements OnInit {
  @Input() propertyList!: PropertyModel[];

  propertyListForDisplay: (string | null)[] = [];
  jsonForClipboard: string = '';
  jsonUrl: any;;
  constructor(
    private sanitizer: DomSanitizer,
    private valueToStringPipe: ValueToStringPipe,
  ) { }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.createJsonForDownload();
    this.propertyListForDisplay = this.preparePropertyList(this.propertyList)
      .map((property: PropertyModel) => {
        return this.valueToStringPipe.transform(property);
      })
  }

  private createJsonForDownload(): void {
    this.jsonForClipboard = JSON.stringify(this.preparePropertyList(this.propertyList));
    const blob = new Blob([this.jsonForClipboard], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.jsonUrl = uri;
  }

  private preparePropertyList(list: PropertyModel[]): PropertyModel[] {
    return list.map((property: PropertyModel) => {
      const modifyProperty = {
        ...property,
        type: this.changeTypeForParser(property.type as string)
      }
      delete modifyProperty.active;
      return modifyProperty;
    })
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
