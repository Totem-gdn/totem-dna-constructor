import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DnaHeaderComponent } from './components/dna-header/dna-header.component';
import { DnaNavComponent } from './components/dna-nav/dna-nav.component';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
    LayoutComponent,
    DnaHeaderComponent,
    DnaNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    DnaHeaderComponent,
    DnaNavComponent
  ]
})
export class LayoutModule { }
