import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ChooseTemplateComponent } from "./choose-template.component";

@NgModule({
    declarations: [
        ChooseTemplateComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ChooseTemplateComponent
    ]
})

export class ChooseTemplateModule {
    
}