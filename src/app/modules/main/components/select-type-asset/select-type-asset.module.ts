import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { SelectTypeAssetComponent } from "./select-type-asset.component";


@NgModule({
    declarations: [
        SelectTypeAssetComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SelectTypeAssetComponent
    ]
})

export class SelectTypeAssetModule {

}