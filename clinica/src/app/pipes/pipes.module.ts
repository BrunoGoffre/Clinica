import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadFotoPipe } from './especialidad-foto.pipe';
import { FormatHorarioPipe } from './format-horario.pipe';



@NgModule({
  declarations: [
    EspecialidadFotoPipe,
    FormatHorarioPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    EspecialidadFotoPipe,
    FormatHorarioPipe
  ]
})
export class PipesModule { }
