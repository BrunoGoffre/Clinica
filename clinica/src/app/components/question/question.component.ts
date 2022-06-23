import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() estadoUpdate !: string;
  resenia: string = '';
  error: boolean = false;
  user = this.firestore.usuario;
  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
  }
  DeleteTurno(respuesta: boolean) {
    if (this.resenia.length < 15 && respuesta == true && this.estadoUpdate != 'aceptado') {
      this.error = true;
    } else {
      this.close.emit({ respuesta: respuesta, resenia: this.resenia });
    }
  }
}
