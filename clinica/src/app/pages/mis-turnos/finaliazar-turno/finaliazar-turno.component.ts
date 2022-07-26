import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HistoriaClinica } from 'src/app/models/Historial';
import { turno } from 'src/app/models/turno';
import { FirestoreService } from 'src/app/services/firestore.service';

export interface Dynamic {
  name: string;
  value: string;
  mostrar: boolean;
}

@Component({
  selector: 'app-finaliazar-turno',
  templateUrl: './finaliazar-turno.component.html',
  styleUrls: ['./finaliazar-turno.component.scss'],
  providers: [MessageService]
})

export class FinaliazarTurnoComponent implements OnInit {

  @Input() turnoAFinalizar!: turno | null;
  @Output() close = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();
  display: boolean = true;
  AlturaText: string = '';
  PesoText: string = '';
  TemperaturaText: string = '';
  PresionText: string = '';
  Dynamic1: Dynamic = { name: '', value: '', mostrar: false };
  Dynamic2: Dynamic = { name: '', value: '', mostrar: false };
  Dynamic3: Dynamic = { name: '', value: '', mostrar: false };
  Dynamic4: Dynamic = { name: '', value: '', mostrar: false };
  Dynamic5: Dynamic = { name: '', value: '', mostrar: false };
  Dynamic6: Dynamic = { name: '', value: '', mostrar: false };

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
  }

  AddDynamicButton() {
    if (this.Dynamic1.mostrar == false)
      this.Dynamic1.mostrar = true;

    else if (this.Dynamic2.mostrar == false)
      this.Dynamic2.mostrar = true;

    else if (this.Dynamic3.mostrar == false)
      this.Dynamic3.mostrar = true;

    else if (this.Dynamic4.mostrar == false)
      this.Dynamic4.mostrar = true;

    else if (this.Dynamic5.mostrar == false)
      this.Dynamic5.mostrar = true;

    else
      this.Dynamic6.mostrar = true;
  }
  LessDynamicButton() {
    if (this.Dynamic6.mostrar == true) {
      this.Dynamic6.mostrar = false;
      this.Dynamic6.name = '';
      this.Dynamic6.value = '';
    }
    else if (this.Dynamic5.mostrar == true) {
      this.Dynamic5.mostrar = false;
      this.Dynamic5.name = '';
      this.Dynamic5.value = '';
    }
    else if (this.Dynamic4.mostrar == true) {
      this.Dynamic4.mostrar = false;
      this.Dynamic4.name = '';
      this.Dynamic4.value = '';
    }
    else if (this.Dynamic3.mostrar == true) {
      this.Dynamic3.mostrar = false;
      this.Dynamic3.name = '';
      this.Dynamic3.value = '';
    }
    else if (this.Dynamic2.mostrar == true) {
      this.Dynamic2.mostrar = false;
      this.Dynamic2.name = '';
      this.Dynamic2.value = '';
    }
    else {
      this.Dynamic1.mostrar = false;
      this.Dynamic1.name = '';
      this.Dynamic1.value = '';
    }
  }
  Cancelar() {
    this.display = false;
    this.close.emit();
  }
  Finalizar() {
    if (this.turnoAFinalizar && this.ValidarCampos()) {
      let historiaClinica: HistoriaClinica = {
        altura: this.AlturaText,
        peso: this.PesoText,
        presion: this.PresionText,
        temperatura: this.TemperaturaText,
        dynamics: this.ObtenerCamposDynamicos()
      }
      this.turnoAFinalizar.historiaClinica = historiaClinica;
      this.turnoAFinalizar.estado = 'completado';
      this.firestore.UpdateObj('turnos', this.turnoAFinalizar, this.turnoAFinalizar.id);
      this.Cancelar();
    }
    else {
      this.error.emit('Debe completar todos los campos');
    }
  }
  ValidarCampos() {
    if (this.AlturaText != '' && this.PesoText != '' && this.TemperaturaText != '' && this.PresionText != '') {
      return true;
    } else {
      return false;
    }
  }
  ObtenerCamposDynamicos(): any[] {
    let dynamics = [];
    if (this.Dynamic1.value != '' && this.Dynamic1.name != '') {
      dynamics.push(this.Dynamic1);
    }
    if (this.Dynamic2.value != '' && this.Dynamic2.name != '') {
      dynamics.push(this.Dynamic2);
    }
    if (this.Dynamic3.value != '' && this.Dynamic3.name != '') {
      dynamics.push(this.Dynamic3);
    }
    if (this.Dynamic4.value != '' && this.Dynamic4.name != '') {
      dynamics.push(this.Dynamic4);
    }
    if (this.Dynamic5.value != '' && this.Dynamic5.name != '') {
      dynamics.push(this.Dynamic5);
    }
    if (this.Dynamic6.value != '' && this.Dynamic6.name != '') {
      dynamics.push(this.Dynamic6);
    }
    return dynamics;
  }
}



