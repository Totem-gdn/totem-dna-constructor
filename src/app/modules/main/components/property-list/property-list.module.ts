import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PropertyListComponent } from "./property-list.component";

@NgModule({
    declarations: [
        PropertyListComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        PropertyListComponent
    ]
})

export class PropertyListModule {
    
}