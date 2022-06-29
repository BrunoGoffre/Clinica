import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MiPerfilComponent } from "./mi-perfil.component";
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { HistorialModule } from "../historial/historial.module";

@NgModule({
    declarations: [
        MiPerfilComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        SelectButtonModule,
        ButtonModule,
        DropdownModule,
        ToastModule,
        HistorialModule
    ],
    exports: [
        MiPerfilComponent
    ]

})
export class MiPerfilModule { }