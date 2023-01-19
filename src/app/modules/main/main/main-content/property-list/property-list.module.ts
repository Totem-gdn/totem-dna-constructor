import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { PropertiesFormModule } from "../properties-form/properties-form.module";
import { PropertyListComponent } from "./property-list.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        PropertyListComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,

        PropertiesFormModule,
        DragDropModule
    ],
    exports: [
        PropertyListComponent
    ]
})

export class PropertyListModule {

}