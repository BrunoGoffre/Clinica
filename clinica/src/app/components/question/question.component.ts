import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Output() close = new EventEmitter<any>();

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
  }

  DeleteTurno(respuesta: boolean) {
    this.close.emit(respuesta);
  }
}
