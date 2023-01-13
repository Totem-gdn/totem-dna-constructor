import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { PropertiesFormModule } from "../properties-form/properties-form.module";
import { PropertyListComponent } from "./property-list.component";

@NgModule({
    declarations: [
        PropertyListComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,

        PropertiesFormModule
    ],
    exports: [
        PropertyListComponent
    ]
})

export class PropertyListModule {

}