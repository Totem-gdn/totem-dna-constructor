import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { AssetTypesComponent } from "./asset-types.component";


@NgModule({
    declarations: [
        AssetTypesComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        AssetTypesComponent
    ]
})

export class SelectTypeAssetModule {

}