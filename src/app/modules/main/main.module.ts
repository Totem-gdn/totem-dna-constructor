import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main/main-page.component';
import { SelectTypeAssetComponent } from './components/select-type-asset/select-type-asset.component';
import { MainRoutingModule } from './main-routing.module';
import { ChooseTemplateComponent } from './components/choose-template/choose-template.component';



@NgModule({
  declarations: [
    SelectTypeAssetComponent,
    MainPageComponent,
    ChooseTemplateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule
  ],
  exports:[
    SelectTypeAssetComponent,
    MainPageComponent,
  ]
})
export class MainModule { }
