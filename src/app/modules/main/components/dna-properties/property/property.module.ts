import { NgModule } from "@angular/core";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared/shared.module";
import { PropertyComponent } from "./property.component";

@NgModule({
    declarations: [
        PropertyComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        MatFormFieldModule
        // MatError
    ],
    exports: [
        PropertyComponent
    ]
})

export class PropertyModule {

}