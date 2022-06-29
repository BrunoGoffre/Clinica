import { Component, Input, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  usuario = this.firestore.usuario;
  turnosCompletadosGeneral: turno[] = [];
  @Input() turnosCompletadosByAdmin!: turno[];

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getTurnosCompletados();
  }

  getTurnosCompletados() {
    this.turnosCompletadosGeneral = [];
    if (this.usuario.value?.rol == 'paciente') {
      console.log('entre en paciente');
      this.firestore.getTurnosPacienteByEmail(this.usuario.value.email).subscribe((retorno) => {
        retorno.forEach(item => {
          if ((item as turno).estado == 'completado') {
            this.turnosCompletadosGeneral.push(item as turno);
          }
        })
      })
    } else if (this.usuario.value?.rol == 'especialista') {
      this.firestore.getTurnosEspcialistaByEmail(this.usuario.value.email).subscribe((retorno) => {
        retorno.forEach(item => {
          if ((item as turno).estado == 'completado') {
            this.turnosCompletadosGeneral.push(item as turno);
          }
        })
      })
    } else if (this.usuario.value?.rol == 'admin') {
      this.turnosCompletadosGeneral = this.turnosCompletadosByAdmin;
    }
  }
}
