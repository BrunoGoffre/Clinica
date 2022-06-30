import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialParaEspecialistaComponent } from './historial-para-especialista/historial-para-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { HistorialModule } from '../historial/historial.module';



@NgModule({
  declarations: [
    HistorialParaEspecialistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    GeneralComponentsModule,
    HistorialModule
  ],
  exports: [
    HistorialParaEspecialistaComponent
  ]
})
export class HistorialParaEspecialistasModule { }
