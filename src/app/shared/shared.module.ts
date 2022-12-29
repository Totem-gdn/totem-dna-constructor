import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "./pipes/pipes.module";

@NgModule({
    declarations: [

    ],
    imports: [
        ReactiveFormsModule,
        PipesModule,
        CommonModule,
    ],
    exports: [
        ReactiveFormsModule,
        PipesModule,
        CommonModule,
    ]
})

export class SharedModule {

}