import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pacientes/pacientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HistorialModule } from '../historial/historial.module';



@NgModule({
  declarations: [
    PacientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    ReactiveFormsModule,
    HistorialModule
  ],
  exports: [
    PacientesComponent
  ]
})
export class PacientesModule { }
