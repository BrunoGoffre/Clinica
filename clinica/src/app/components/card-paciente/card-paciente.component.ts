import { Component, Input, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.scss']
})
export class CardPacienteComponent implements OnInit {

  currentUser = this.firestore.usuario;
  @Input() usuario!: Usuario;
  DatosAMostrar!: turno[];
  Ultimos3turnosCompletados!: any[];
  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getUltimosTurnos(this.usuario);

  }
  getUltimosTurnos(usuario: Usuario) {
    this.Ultimos3turnosCompletados = [];
    let lista: any[] = [];
    this.firestore.getTurnosPacienteByEmail(usuario.email).subscribe(retorno => {
      retorno.forEach(item => {
        if ((item as turno).hora != (lista[lista.length - 1] as turno)?.hora &&
          (item as turno).estado == 'completado' &&
          this.currentUser.value?.email == (item as turno).especialista.email) {
          lista.push(item as turno);
        }
      })
      this.Ultimos3turnosCompletados = lista.slice(0, 3);
    });
  }

}
