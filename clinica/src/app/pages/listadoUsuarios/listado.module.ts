import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { GeneralComponentsModule } from "src/app/components/general-components.module";
import { HistorialModule } from "../historial/historial.module";
import { ListadoComponent } from "./listado.component";

@NgModule({
    declarations: [
        ListadoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HistorialModule,
        GeneralComponentsModule,
        DialogModule,
        ButtonModule
    ],
    exports: [ListadoComponent]
})
export class ListadoModule { }