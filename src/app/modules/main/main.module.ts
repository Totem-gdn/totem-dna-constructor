import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main/main-page.component';
import { SelectTypeAssetComponent } from './components/select-type-asset/select-type-asset.component';
import { MainRoutingModule } from './main-routing.module';
import { ChooseTemplateComponent } from './components/choose-template/choose-template.component';
import { PropertiesCollectionComponent } from './components/properties-collection/properties-collection.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { PropertyVisualGeneComponent } from './components/property-visual-gene/property-visual-gene.component';
import { JsonVisualFileComponent } from './components/json-visual-file/json-visual-file.component';



@NgModule({
  declarations: [
    SelectTypeAssetComponent,
    MainPageComponent,
    ChooseTemplateComponent,
    PropertiesCollectionComponent,
    PropertyListComponent,
    PropertyFormComponent,
    PropertyVisualGeneComponent,
    JsonVisualFileComponent,
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
