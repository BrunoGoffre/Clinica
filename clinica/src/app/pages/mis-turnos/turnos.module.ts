import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosComponent } from './mis-turnos.component';
import { AddTurnoComponent } from 'src/app/pages/mis-turnos/add-turno/add-turno.component';
import { FinaliazarTurnoComponent } from 'src/app/pages/mis-turnos/finaliazar-turno/finaliazar-turno.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RecaptchaLoaderService, RecaptchaModule } from 'ng-recaptcha';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    MisTurnosComponent,
    AddTurnoComponent,
    FinaliazarTurnoComponent,
    EncuestaComponent,
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
    ToastModule,
    InputTextModule,
    ToggleButtonModule,
    DirectivesModule,
    RecaptchaModule,
    TooltipModule,
    TableModule
  ],
  exports: [
    MisTurnosComponent,
  ],
  providers: [
    RecaptchaLoaderService
  ]
})
export class TurnosModule { }
