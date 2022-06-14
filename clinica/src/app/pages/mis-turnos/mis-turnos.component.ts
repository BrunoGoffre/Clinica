import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  agregandoTurno: boolean = false;
  turnos: Array<turno> = [];
  turnosWithoutFilter: Array<turno> = [];
  filter: string = '';
  constructor() { }

  ngOnInit(): void {
    //this.turnos
  }


  // onFilter() {
  //   this.turnos = this.turnosWithoutFilter.filter(turno => turno.especialidad.toLowerCase().includes(this.filter.toLowerCase())  ||
  //   turno.especialista.nombre.toLowerCase().includes(this.filter.toLowerCase()) || turno.especialista.apellido.toLowerCase().includes(this.filter.toLowerCase()))
  // }

  OpenForm() {
    this.agregandoTurno = true;
  }
}