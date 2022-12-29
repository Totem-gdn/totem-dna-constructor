import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ChooseTemplateModule } from "../choose-template/choose-template.module";
import { DNAPropertiesModule } from "../dna-properties/dna-properties.module";
import { PropertyModule } from "../dna-properties/property/property.module";
import { GenesPreviewModule } from "../genes-preview/genes-preview.module";
import { JSONPreviewModule } from "../json-preview/json-preview.module";
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
        PropertyModule,
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