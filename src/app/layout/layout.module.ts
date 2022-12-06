import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainModule } from '../modules/main/main.module';
import { DnaHeaderComponent } from './components/dna-header/dna-header.component';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
    LayoutComponent,
    DnaHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainModule,
  ],
  exports:[
    DnaHeaderComponent,
    // MainModule,
  ]
})
export class LayoutModule { }
