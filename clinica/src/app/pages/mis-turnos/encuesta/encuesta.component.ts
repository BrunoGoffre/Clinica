import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { MessageService } from 'primeng/api';
import { encuesta } from 'src/app/models/encuesta';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
  providers: [MessageService]
})
export class EncuestaComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() success = new EventEmitter();
  @Input() turno!: turno;
  opinion: string = '';
  stars: any = 0;
  toggleResponse: boolean = true;
  radioButtons: any;
  valueRange: any = 0;
  constructor(private messageService: MessageService, private firestore: FirestoreService) {
  }

  ngOnInit(): void {

  }
  Close() {
    this.close.emit();
  }
  Validate() {
    if (this.opinion.length > 10 && this.radioButtons && this.stars != 0) {
      return true;
    } else {
      return false;
    }
  }
  Finalizar() {
    if (this.Validate()) {
      let dateNow = new Date();
      this.turno.EncuestaCompletada = true;
      let encuesta: encuesta = {
        usuario: this.firestore.usuario.value as Usuario,
        id: Guid.create().toString(),
        opinion: this.opinion,
        stars: this.stars,
        willComeBack: this.toggleResponse,
        professionalism: this.radioButtons,
        recomendable: this.valueRange,
        date: dateNow.getDate() + "/" + dateNow.getMonth() + "/" + dateNow.getFullYear(),
        turno: this.turno
      };
      this.firestore.UpdateObj('turnos', this.turno, this.turno.id);
      this.firestore.UpdateObj('encuestas', encuesta);
      this.success.emit();
      this.Close();
    } else {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Porfavor complete todos los campos' });
    }
  }
}
