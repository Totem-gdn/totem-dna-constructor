import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { PropertyFieldComponent } from "./property-field.component";

@NgModule({
    declarations: [
        PropertyFieldComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        ReactiveFormsModule
    ],
    exports: [
        PropertyFieldComponent
    ]
})

export class PropertyFieldModule {

}