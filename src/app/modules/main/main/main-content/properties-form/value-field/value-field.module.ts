import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ValueFieldComponent } from "./value-field.component";

@NgModule({
    declarations: [
        ValueFieldComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ValueFieldComponent
    ]
})

export class ValueFieldModule {
    
}