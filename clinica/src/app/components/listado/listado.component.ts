import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  cargando: boolean = false;
  users: Array<Usuario> = [];

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getUsers().then(() => this.cargando = true);
  }
  async getUsers() {
    await this.firestore.getPacientes().subscribe((retorno) => {
      retorno.forEach((item) => {
        this.users.push(item as Usuario);
      })
      this.cargando = false;
    })
  }

}
