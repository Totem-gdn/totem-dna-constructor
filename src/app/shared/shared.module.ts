import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OnlyNumber } from "./directives/only-number.directive";
import { PipesModule } from "./pipes/pipes.module";

@NgModule({
    declarations: [
        OnlyNumber
    ],
    imports: [
        ReactiveFormsModule,
        PipesModule,
        CommonModule,
        HttpClientModule,


    ],
    exports: [
        ReactiveFormsModule,
        PipesModule,
        CommonModule,
        HttpClientModule,

        OnlyNumber,
    ]
})

export class SharedModule {

}