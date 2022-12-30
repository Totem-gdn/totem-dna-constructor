import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
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
        HttpClientModule
    ],
    exports: [
        ReactiveFormsModule,
        PipesModule,
        CommonModule,
        HttpClientModule
    ]
})

export class SharedModule {

}