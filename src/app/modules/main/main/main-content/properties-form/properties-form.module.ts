import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MaterialModule } from "@app/shared/material/material.module";
import { SharedModule } from "@app/shared/shared.module";
import { PropertiesFormComponent } from "./properties-form.component";
import { PropertyFieldModule } from "./property-field/property-field.module";
import { ValueFieldModule } from "./value-field/value-field.module";

@NgModule({
    declarations: [
        PropertiesFormComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        ReactiveFormsModule,

        PropertyFieldModule,
        ValueFieldModule
        // MaterialModule
        // MatError
    ],
    exports: [
        PropertiesFormComponent
    ]
})

export class PropertiesFormModule {

}