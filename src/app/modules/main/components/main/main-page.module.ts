import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ChooseTemplateModule } from "../choose-template/choose-template.module";
import { DNAPropertiesModule } from "../property-types/property-types.module";
import { GenesPreviewModule } from "../genes-preview/genes-preview.module";
import { JSONPreviewModule } from "../json-preview/json-preview.module";
import { PropertiesFormModule } from "../properties-form/properties-form.module";
import { PropertyListModule } from "../property-list/property-list.module";
import { SelectTypeAssetModule } from "../select-type-asset/select-type-asset.module";
import { MainPageComponent } from "./main-page.component";


@NgModule({
    declarations: [
        MainPageComponent
    ],
    imports: [
        SharedModule,
        DNAPropertiesModule,
        PropertiesFormModule,
        DNAPropertiesModule,

        JSONPreviewModule,
        GenesPreviewModule,
        ChooseTemplateModule,
        PropertyListModule,
        SelectTypeAssetModule
    ],
    exports: [
        MainPageComponent
    ]
})

export class MainPageModule {

}