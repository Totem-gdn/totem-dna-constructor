import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GenesPreviewComponent } from "./genes-preview.component";

@NgModule({
    declarations: [
        GenesPreviewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        GenesPreviewComponent
    ]
})

export class GenesPreviewModule {
    
}