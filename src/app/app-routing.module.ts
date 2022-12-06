import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('./modules/dna-avatar/dna-avatar.module').then(m => m.DnaAvatarModule) },
      { path: '', loadChildren: () => import('./modules/dna-gem/dna-gem.module').then(m => m.DnaGemModule) },
      { path: '', loadChildren: () => import('./modules/dna-item/dna-item.module').then(m => m.DnaItemModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
