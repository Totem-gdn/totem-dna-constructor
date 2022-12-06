import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DnaAvatarComponent } from './components/dna-avatar/dna-avatar.component';
import { DnaAvatarRoutingModule } from './dna-avatar-routing.module';



@NgModule({
  declarations: [
    DnaAvatarComponent
  ],
  imports: [
    CommonModule,
    DnaAvatarRoutingModule
  ]
})
export class DnaAvatarModule { }
