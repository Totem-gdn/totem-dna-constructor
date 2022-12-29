import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DNAPropertiesComponent } from "./dna-properties.component";
import { PropertyModule } from "./property/property.module";

@NgModule({
    declarations: [
        DNAPropertiesComponent
    ],
    imports: [
        SharedModule,
        // PropertyModule
    ],
    exports: [
        DNAPropertiesComponent
    ]
})

export class DNAPropertiesModule {

}