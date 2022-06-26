import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosComponent } from './mis-turnos.component';
import { AddTurnoComponent } from 'src/app/pages/mis-turnos/add-turno/add-turno.component';
import { FinaliazarTurnoComponent } from 'src/app/pages/mis-turnos/finaliazar-turno/finaliazar-turno.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';

@NgModule({
  declarations: [
    MisTurnosComponent,
    AddTurnoComponent,
    FinaliazarTurnoComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    GeneralComponentsModule
  ],
  exports: [
    MisTurnosComponent,
  ]
})
export class TurnosModule { }
