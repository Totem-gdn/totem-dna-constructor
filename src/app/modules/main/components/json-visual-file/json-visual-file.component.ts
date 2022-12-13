import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-json-visual-file',
  templateUrl: './json-visual-file.component.html',
  styleUrls: ['./json-visual-file.component.scss']
})
export class JsonVisualFileComponent implements OnInit, OnChanges {
  @Input() propertyList!: PropertyModel[];
  jsonAsString: string = '';
  jsonUrl: any;;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log('propertyList', this.propertyList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    
    this.jsonAsString = JSON.stringify(this.propertyList);
    this.createJsonForDownload();
  }

  createJsonForDownload(): void {
    const theJSON = JSON.stringify(this.propertyList);
    const blob = new Blob([theJSON],{type: 'text/json'});
    const url = window.URL.createObjectURL(blob);
    const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.jsonUrl = uri;
  }

}
