import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

import { Paciente } from 'src/app/models/usuario';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  users !: Array<Paciente>;
  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
  }
  getUsers() {
    this.firestore.getPacientes().subscribe((retorno) => {
      retorno.forEach((item) => {
        this.users.push(item as Paciente);
      })
    })
  }

}
