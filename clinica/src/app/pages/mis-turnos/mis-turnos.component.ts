import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  providers: [MessageService]

})
export class MisTurnosComponent implements OnInit {

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
  estadoUpdate!: string;
  mostrarFinalizarFormulario!: boolean;
  error: string = '';

  constructor(private firestore: FirestoreService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTurnos();
  }


  onFilter(filter: any) {
    let valueFilter = filter['srcElement']['value'];
    this.filter = valueFilter;
    this.turnos = this.turnosWithoutFilter.filter(turno => turno.especialista.especialidad.toLowerCase().includes(valueFilter.toLowerCase()) ||
      turno.especialista.nombre.toLowerCase().includes(valueFilter.toLowerCase()) || turno.especialista.apellido.toLowerCase().includes(valueFilter.toLowerCase()))
  }

  getTurnos() {
    this.cargando = true;
    if (this.user.rol == 'paciente') {
      this.firestore.getTurnosPacienteByEmail(this.user.email).subscribe((retorno) => {
        this.turnos = [];
        retorno.forEach((item) => {
          this.turnos.push(item as turno);
        })

        if (this.filter)
          this.onFilter(this.filter);

        this.turnosWithoutFilter = this.turnos;
        this.cargando = false;
      });
    } else if (this.user.rol == 'especialista') {
      this.firestore.getTurnosEspcialistaByEmail(this.user.email).subscribe((retorno) => {
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
    console.log(respuesta);
    if (this.UpdateTurnoSelected?.estado && respuesta['respuesta'] == true) {
      this.UpdateTurnoSelected.resenia = respuesta['resenia'];
      this.UpdateTurnoSelected.estado = this.estadoUpdate;
      this.firestore.UpdateObj('turnos', this.UpdateTurnoSelected, this.UpdateTurnoSelected?.id).then((retorno) => {
        this.cargando = false;
        this.mostrarQuestion = false;
        this.UpdateTurnoSelected = null;
      });
    } else {
      this.cargando = false;
      this.mostrarQuestion = false;
    }
  }
  onClickError(mensage: string) {
    this.messageService.add({ key: 'c', severity: 'error', summary: 'Error', detail: mensage });
  }
  ChangeStateTurno(state: string, turno: turno) {
    this.UpdateTurnoSelected = turno;
    if (state == 'cancelar') {
      this.estadoUpdate = 'cancelado';
    } else if (state == 'aceptar') {
      this.estadoUpdate = 'aceptado';
    } else if (state == 'rechazar') {
      this.estadoUpdate = 'rechazado';
    }
    this.mostrarQuestion = true;
  }

  ShowFinalizarForm(turno: turno) {
    this.mostrarFinalizarFormulario = true;
  }
}