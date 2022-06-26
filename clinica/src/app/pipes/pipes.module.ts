import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadFotoPipe } from './especialidad-foto.pipe';



@NgModule({
  declarations: [
    EspecialidadFotoPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    EspecialidadFotoPipe
  ]
})
export class PipesModule { }
