import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-historial-para-especialista',
  templateUrl: './historial-para-especialista.component.html',
  styleUrls: ['./historial-para-especialista.component.scss']
})
export class HistorialParaEspecialistaComponent implements OnInit {

  usuario = this.firestore.usuario;
  turnosCompletados: any[] = [];
  Ultimos3turnosCompletados: any[] = [];
  TurnosPacientes: turno[] = [];
  usuarios: Usuario[] = [];
  usuarioParaDialog!: Usuario;
  display: boolean = false;

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.GetUsuarios();
  }
  GetTurnosCompletados(email: string) {
    this.turnosCompletados = [];
    this.firestore.getTurnosPacienteByEmail(email).subscribe((retorno) => {
      retorno.forEach(item => {
        if ((item as turno).estado == 'completado') {
          this.turnosCompletados.push(item as turno);
        }
      })
    })
  }

  GetUsuarios() {
    this.usuarios = [];
    if (this.usuario.value?.email) {
      this.firestore.getTurnosEspcialistaByEmail(this.usuario.value.email).subscribe(retorno => {
        retorno.forEach(item => {
          if ((item as turno).estado == 'completado') {
            this.usuarios.push((item as turno).usuario);
          }
        })
      });
    }
  }
  MostrarDialog(usuario: Usuario) {
    this.usuarioParaDialog = usuario;
    this.display = true;
  }



}
