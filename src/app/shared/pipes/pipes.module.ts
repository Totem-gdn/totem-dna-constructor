import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValueToStringPipe } from './value-to-string.pipe';



@NgModule({
  declarations: [
    ValueToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValueToStringPipe
  ],
  providers: [
    ValueToStringPipe
  ]
})
export class PipesModule { }
