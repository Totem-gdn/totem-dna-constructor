import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ChooseTemplateComponent } from './components/choose-template/choose-template.component';
import { JsonVisualFileComponent } from './components/json-visual-file/json-visual-file.component';
import { MainPageComponent } from './components/main/main-page.component';
import { PropertiesCollectionComponent } from './components/properties-collection/properties-collection.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyVisualGeneComponent } from './components/property-visual-gene/property-visual-gene.component';
import { SelectTypeAssetComponent } from './components/select-type-asset/select-type-asset.component';
import { MainRoutingModule } from './main-routing.module';



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
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports:[
    SelectTypeAssetComponent,
    MainPageComponent,
  ],
})
export class MainModule { }
