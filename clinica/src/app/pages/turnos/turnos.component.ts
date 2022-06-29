import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  agregandoTurno: boolean = false;
  mostrarReview: boolean = false;
  turnos: Array<turno> = [];
  turnoSelected !: string;
  turnosWithoutFilter: Array<turno> = [];
  cargando: boolean = false;
  filter!: string;
  user !: Usuario;
  mostrarQuestion: boolean = false;
  response !: boolean;
  UpdateTurnoSelected !: turno | null;
  error: string = '';

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTurnos();
  }


  onFilter(filter: any) {
    let valueFilter = filter['srcElement']['value'];
    this.filter = valueFilter;
    this.turnos = this.turnosWithoutFilter.filter(turno => turno.especialista.especialidad.toLowerCase().includes(valueFilter.toLowerCase()) ||
      turno.especialista.nombre.toLowerCase().includes(valueFilter.toLowerCase()) || turno.especialista.apellido.toLowerCase().includes(valueFilter.toLowerCase()));
  }

  getTurnos() {
    this.cargando = true;
    this.firestore.getTurnos().subscribe((retorno) => {
      this.turnos = [];
      retorno.forEach((item) => {
        this.turnos.push(item as turno);
      })

      if (this.filter)
        this.onFilter(this.filter);

      this.turnosWithoutFilter = this.turnos;
      this.cargando = false;
    });
  }

  getCurrentUser() {
    this.user = JSON.parse(window.localStorage.getItem('usuario') as string) as Usuario;
  }

  OpenForm() {
    this.agregandoTurno = true;
  }
  Closeform() {
    this.agregandoTurno = false;
  }
  viewReview(resenia: string) {
    if (resenia != null && resenia != '') {
      this.turnoSelected = resenia;
      this.mostrarReview = true;
    } else {
      this.error = 'No hay ninguna reseña';
    }
  }
  CloseReiew() {
    this.mostrarReview = false;
  }
  UpdateTurno(respuesta: any) {
    this.cargando = true;
    if (this.UpdateTurnoSelected?.estado) {
      this.UpdateTurnoSelected.estado = 'cancelado';
      this.UpdateTurnoSelected.resenia = respuesta['resenia'];
      console.log(this.UpdateTurnoSelected.resenia);
      if (respuesta['respuesta'] == true) {
        this.firestore.UpdateObj('turnos', this.UpdateTurnoSelected, this.UpdateTurnoSelected?.id).then((retorno) => {
          this.cargando = false;
          this.mostrarQuestion = false;
          this.UpdateTurnoSelected = null;
        });
      }
    } else if (respuesta['respuesta'] == false) {
      this.mostrarQuestion = false;
      this.cargando = false;
    }
  }
  wantToCancel(turno: turno) {
    this.UpdateTurnoSelected = turno;
    this.mostrarQuestion = true;
  }
  onClickError() {
    this.error = '';
  }
  canCencel(turno: turno) {
    if (turno.estado != 'aceptado' && turno.estado != 'cancelado' && turno.estado != 'rechazado') {
      return true;
    } else {
      return false;
    }

  }

}
