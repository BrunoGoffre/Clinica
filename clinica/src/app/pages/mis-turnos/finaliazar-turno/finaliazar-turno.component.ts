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

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
  }

  AddDynamicButton() {
    if (this.Dynamic1.mostrar == false)
      this.Dynamic1.mostrar = true;
    else if (this.Dynamic2.mostrar == false)
      this.Dynamic2.mostrar = true;
    else
      this.Dynamic3.mostrar = true
  }
  LessDynamicButton() {
    if (this.Dynamic3.mostrar == true) {
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
    if (this.Dynamic1.value != '') {
      dynamics.push(this.Dynamic1);
    }
    if (this.Dynamic2.value != '') {
      dynamics.push(this.Dynamic2);
    }
    if (this.Dynamic3.value != '') {
      dynamics.push(this.Dynamic3);
    }
    return dynamics;
  }
}



