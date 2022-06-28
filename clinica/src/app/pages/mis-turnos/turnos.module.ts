import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosComponent } from './mis-turnos.component';
import { AddTurnoComponent } from 'src/app/pages/mis-turnos/add-turno/add-turno.component';
import { FinaliazarTurnoComponent } from 'src/app/pages/mis-turnos/finaliazar-turno/finaliazar-turno.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MisTurnosComponent,
    AddTurnoComponent,
    FinaliazarTurnoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralComponentsModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  exports: [
    MisTurnosComponent,
  ]
})
export class TurnosModule { }
