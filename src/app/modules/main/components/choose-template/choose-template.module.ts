import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ChooseTemplateComponent } from "./choose-template.component";
import { SearchModule } from "./search/search.module";

@NgModule({
    declarations: [
        ChooseTemplateComponent
    ],
    imports: [
        SharedModule,

        SearchModule,
        MatIconModule,
    ],
    exports: [
        ChooseTemplateComponent
    ]
})

export class ChooseTemplateModule {

}