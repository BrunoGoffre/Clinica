import { Component, Input, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  usuario = this.firestore.usuario;
  turnosCompletadosGeneral: turno[] = [];
  cargando: boolean = false;
  @Input() turnosCompletadosByAdmin!: turno[];
  @Input() usuarioEntrando!: Usuario;

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getTurnosCompletados();
  }

  getTurnosCompletados() {
    this.cargando = true;
    this.turnosCompletadosGeneral = [];
    if (this.usuario.value?.rol == 'paciente') {
      this.firestore.getTurnosPacienteByEmail(this.usuario.value.email).subscribe((retorno) => {
        retorno.forEach(item => {
          if ((item as turno).estado == 'completado') {
            this.turnosCompletadosGeneral.push(item as turno);
          }
        })
        this.cargando = false;
      })
    } else if (this.usuario.value?.rol == 'especialista') {
      this.firestore.getTurnosPacienteByEmail(this.usuarioEntrando.email).subscribe((retorno) => {
        retorno.forEach(item => {
          if ((item as turno).estado == 'completado') {
            this.turnosCompletadosGeneral.push(item as turno);
          }
        })
        this.cargando = false;
      })
    } else if (this.usuario.value?.rol == 'admin') {
      this.turnosCompletadosGeneral = this.turnosCompletadosByAdmin;
      this.cargando = false;
    }
  }
  getTitulos() {
    if (this.turnosCompletadosGeneral != []) {
      this.turnosCompletadosGeneral
    }
  }
}
