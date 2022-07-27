import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MessageService } from 'primeng/api';
import { RecaptchaLoaderService } from 'ng-recaptcha';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  providers: [MessageService, RecaptchaLoaderService]

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
  error: string = '';
  displayDialog: boolean = false;
  displayEncuesta: boolean = false;

  constructor(private firestore: FirestoreService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTurnos();
  }


  onFilter(filter: any) {
    let valueFilter = filter['srcElement']['value'];
    this.filter = valueFilter;
    let retorno = false;
    this.turnos = this.turnosWithoutFilter.filter(turno => {

      retorno = turno.estado.toLowerCase().includes(valueFilter.toLowerCase()) ||
        turno.fecha.toLowerCase().includes(valueFilter.toLowerCase()) ||
        turno.hora.toLowerCase().includes(valueFilter.toLowerCase());

      if (turno.especialista) {
        retorno = retorno || turno.id.toLowerCase().includes(valueFilter.toLowerCase()) ||
          turno.especialista.especialidad.toLowerCase().includes(valueFilter.toLowerCase()) ||
          turno.especialista.nombre.toLowerCase().includes(valueFilter.toLowerCase()) ||
          turno.especialista.apellido.toLowerCase().includes(valueFilter.toLowerCase());
      }
      if (turno.usuario) {
        retorno = retorno || turno.usuario.nombre.toLowerCase().includes(valueFilter.toLowerCase()) ||
          turno.usuario.apellido.toLowerCase().includes(valueFilter.toLowerCase()) ||
          turno.usuario.email.toLowerCase().includes(valueFilter.toLowerCase());
      }
      if (turno.historiaClinica) {
        retorno = retorno || turno.historiaClinica.peso.toLowerCase().includes(this.filter.toLowerCase()) ||
          turno.historiaClinica.altura.toLowerCase().includes(this.filter.toLowerCase()) ||
          turno.historiaClinica.temperatura.toLowerCase().includes(this.filter.toLowerCase()) ||
          turno.historiaClinica.presion.toLowerCase().includes(this.filter.toLowerCase());

        if (turno.historiaClinica.dynamics) {
          turno.historiaClinica.dynamics.forEach(dinamyc => {
            retorno = retorno || dinamyc.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()) ||
              dinamyc.value.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase());
          })
        }
      }
      return retorno;
    })
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
          if ((item as turno).estado != 'completado' && (item as turno).estado != 'cancelado') {
            this.turnos.push(item as turno);
          }
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
  CloseEncuesta() {
    this.displayEncuesta = false;
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
    this.displayDialog = true;
    this.UpdateTurnoSelected = turno;
  }
  CloseFinalizarForm() {
    this.displayDialog = false;
  }
}