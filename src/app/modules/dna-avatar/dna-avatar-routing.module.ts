import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DnaAvatarComponent } from './components/dna-avatar/dna-avatar.component';

const routes: Routes = [
  {
    path: '',
    component: DnaAvatarComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DnaAvatarRoutingModule { }
