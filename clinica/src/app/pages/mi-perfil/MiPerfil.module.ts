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
import { PipesModule } from "src/app/pipes/pipes.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../mis-turnos/turnos.module";

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
        HistorialModule,
        PipesModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        MiPerfilComponent
    ]

})
export class MiPerfilModule { }