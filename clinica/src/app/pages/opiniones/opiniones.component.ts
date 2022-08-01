import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { encuesta } from 'src/app/models/encuesta';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss']
})
export class OpinionesComponent implements OnInit {

  encuestas: encuesta[] = [];
  porcentajeRepetirAtencion: number = 0;
  cargando: boolean = false;
  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.GetEncuestas();
  }

  GetEncuestas() {
    this.cargando = true;
    let willComeBack = 0;
    this.firestore.GetEncuestas().subscribe(retorno => {
      this.encuestas = retorno as encuesta[];
      this.encuestas.forEach(encuesta => {
        if (encuesta.willComeBack == true) {
          willComeBack++;
        }
      })
      this.porcentajeRepetirAtencion = Number.parseFloat(((willComeBack * 100) / this.encuestas.length).toFixed(2));
      this.cargando = false;
    })
  }

}
