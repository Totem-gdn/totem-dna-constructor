import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { PropertyTypesComponent } from "./property-types.component";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        PropertyTypesComponent
    ],
    imports: [
        SharedModule,
        // PropertyModule
        DragDropModule,
        MatIconModule
    ],
    exports: [
        PropertyTypesComponent
    ]
})

export class DNAPropertiesModule {

}