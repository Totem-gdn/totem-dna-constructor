import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { PropertyTypesComponent } from "./property-types.component";

@NgModule({
    declarations: [
        PropertyTypesComponent
    ],
    imports: [
        SharedModule,
        // PropertyModule
    ],
    exports: [
        PropertyTypesComponent
    ]
})

export class DNAPropertiesModule {

}