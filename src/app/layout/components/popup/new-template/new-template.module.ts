import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TemplatePopupComponent } from "./new-template.component";

@NgModule({
    declarations: [
        TemplatePopupComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TemplatePopupComponent
    ]
})

export class TemplatePopupModule {
    
}