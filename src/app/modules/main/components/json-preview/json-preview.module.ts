import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "src/app/shared/shared.module";
import { JSONPreviewComponent } from "./json-preview.component";


@NgModule({
    declarations: [
        JSONPreviewComponent
    ],
    imports: [
        SharedModule,
        MatTooltipModule,
        ClipboardModule,
    ],
    exports: [
        JSONPreviewComponent
    ]
})

export class JSONPreviewModule {

}