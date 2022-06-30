import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { GeneralComponentsModule } from "src/app/components/general-components.module";
import { HistorialModule } from "../historial/historial.module";
import { ListadoComponent } from "./listado.component";
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ListadoComponent
    ],
    imports: [
        RouterModule.forChild([]),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HistorialModule,
        GeneralComponentsModule,
        DialogModule,
        ButtonModule,
        TooltipModule,
        InputTextModule,
        PasswordModule,
        DropdownModule
    ],
    exports: [ListadoComponent]
})
export class ListadoModule { }