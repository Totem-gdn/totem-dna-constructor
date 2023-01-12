import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ChooseTemplateModule } from "../components/choose-template/choose-template.module";
import { DNAPropertiesModule } from "../components/property-types/property-types.module";
import { GenesPreviewModule } from "../components/genes-preview/genes-preview.module";
import { JSONPreviewModule } from "../components/json-preview/json-preview.module";
import { PropertiesFormModule } from "../components/properties-form/properties-form.module";
import { PropertyListModule } from "../components/property-list/property-list.module";
import { SelectTypeAssetModule } from "../components/asset-types/asset-types.module";
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