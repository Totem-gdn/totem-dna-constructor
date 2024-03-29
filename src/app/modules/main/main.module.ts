import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material/material.module';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { SharedModule } from 'shared/shared.module';
import { ChooseTemplateComponent } from './main/components/choose-template/choose-template.component';
import { JSONPreviewModule } from './main/components/json-preview/json-preview.module';
import { MainPageComponent } from './main/main-page.component';
import { PropertyListComponent } from './main/main-content/property-list/property-list.component';
import { GenesPreviewModule } from './main/main-content/genes-preview/genes-preview.module';
import { MainRoutingModule } from './main-routing.module';
import { DNAPropertiesModule } from './main/components/property-types/property-types.module';
import { MainPageModule } from './main/main-page.module';



@NgModule({
  declarations: [
    // SelectTypeAssetComponent,
    // PropertyListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    MainRoutingModule,
    // MaterialModule,
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
