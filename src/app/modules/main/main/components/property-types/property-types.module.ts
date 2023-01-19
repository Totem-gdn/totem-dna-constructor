import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { PropertyTypesComponent } from "./property-types.component";
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        PropertyTypesComponent
    ],
    imports: [
        SharedModule,
        // PropertyModule
        DragDropModule
    ],
    exports: [
        PropertyTypesComponent
    ]
})

export class DNAPropertiesModule {

}