import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChooseTemplateComponent } from './components/choose-template/choose-template.component';
import { JSONPreviewModule } from './components/json-preview/json-preview.module';
import { MainPageComponent } from './components/main/main-page.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { GenesPreviewModule } from './components/genes-preview/genes-preview.module';
import { SelectTypeAssetComponent } from './components/select-type-asset/select-type-asset.component';
import { MainRoutingModule } from './main-routing.module';
import { DNAPropertiesModule } from './components/dna-properties/dna-properties.module';
import { MainPageModule } from './components/main/main-page.module';



@NgModule({
  declarations: [
    // SelectTypeAssetComponent,
    // PropertyListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    MainRoutingModule,
    MaterialModule,
    MainPageModule,

    // DNAPropertiesModule,
    GenesPreviewModule,
    JSONPreviewModule
  ],
  exports:[
    // SelectTypeAssetComponent,
    MainPageComponent,
  ],
})
export class MainModule { }
