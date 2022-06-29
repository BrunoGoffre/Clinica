import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialComponent } from './historial/historial.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';



@NgModule({
  declarations: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SelectButtonModule
  ],
  exports: [
    HistorialComponent
  ]
})
export class HistorialModule { }
