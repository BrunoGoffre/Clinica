import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  agregandoTurno: boolean = false;
  mostrarReview: boolean = false;
  turnos: Array<turno> = [];
  turnoSelected !: string;
  turnosWithoutFilter: Array<turno> = [];
  filter: string = '';
  cargando: boolean = false;
  user !: Usuario;
  mostrarQuestion: boolean = false;

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTurnos();
  }


  onFilter() {
    //  this.turnos = this.turnosWithoutFilter.filter(turno => turno.especialidad.toLowerCase().includes(this.filter.toLowerCase())  ||
    // turno.especialista.nombre.toLowerCase().includes(this.filter.toLowerCase()) || turno.especialista.apellido.toLowerCase().includes(this.filter.toLowerCase()))
  }

  getTurnos() {
    this.cargando = true;
    this.firestore.getTurnos(this.user.email).subscribe((retorno) => {
      retorno.forEach((item) => {
        this.turnos.push(item as turno);
      })
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
    }
  }
  CloseReiew() {
    this.mostrarReview = false;
  }
  deleteTurno(turno: turno) {
    this.cargando = true;
    //this.firestore.
  }
  wantToDelete() {
    this.mostrarQuestion = true;
  }
  closeWantToDelete() {
    this.mostrarQuestion = false;
  }
}