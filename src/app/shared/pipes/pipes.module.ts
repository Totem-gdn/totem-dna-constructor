import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapPropertyPipe } from './map-property.pipe';
import { ValueToStringPipe } from './value-to-string.pipe';



@NgModule({
  declarations: [
    ValueToStringPipe,
    MapPropertyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValueToStringPipe,
    MapPropertyPipe
  ],
  providers: [
    ValueToStringPipe
  ]
})
export class PipesModule { }
