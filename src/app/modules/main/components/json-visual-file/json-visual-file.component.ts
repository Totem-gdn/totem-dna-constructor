import { Component, Input, OnInit } from '@angular/core';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-json-visual-file',
  templateUrl: './json-visual-file.component.html',
  styleUrls: ['./json-visual-file.component.scss']
})
export class JsonVisualFileComponent implements OnInit {
  @Input() propertyList!: PropertyModel[];
  constructor() { }

  ngOnInit(): void {
    console.log('propertyList', this.propertyList);
    
  }

}
