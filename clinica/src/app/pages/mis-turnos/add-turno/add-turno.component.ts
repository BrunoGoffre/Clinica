import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Guid } from "guid-typescript";

export enum EDays {
  "Lunes" = 1,
  "Martes" = 2,
  "Miercoles" = 3,
  "Jueves" = 4,
  "Viernes" = 5,
  "Sabado" = 6
}

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.scss']
})
export class AddTurnoComponent implements OnInit {

  display: boolean = true;
  @Output() close = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();
  especialidadSeleccionada: string = '';
  especialistaSeleccionado !: Usuario | any;
  especialistas: Array<Usuario> = [];
  especialidades: Array<string> = [];
  cargando: boolean = false;
  turno !: turno;
  horas: any[] = [];
  horaSelected!: string;
  dias: any[] = [];
  diaSelected!: string;

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getEspecialistas();
    this.getEspecialidades().then(() => this.cargando = false);
  }

  onClose() {
    this.close.emit();
  }

  getEspecialistas() {
    this.cargando = true;
    this.especialistas = [];
    this.firestore.getEspecilistas().subscribe((retorno) => {
      retorno.forEach(item => {
        if ((item as Usuario).dias != null && (item as Usuario).dias != [])
          this.especialistas.push(item as Usuario);
      })
      this.cargando = false;
    })
  }

  async getEspecialidades() {
    this.cargando = true;
    await this.firestore.getEspecilistas().subscribe((retorno) => {
      retorno.forEach((item) => {
        this.especialidades.push((item as Usuario).especialidad);
      })
    });
  }

  async FilterByEspecilidad(especilidad: string) {
    await this.firestore.getEspecilistasByEspecilidad(especilidad).subscribe((retorno) => {
      this.especialistas = [];
      retorno.forEach((item) => {
        this.especialistas.push(item as Usuario);
      });
    })
  }

  selectEspecialista(especialista: Usuario) {
    this.especialistaSeleccionado = especialista;
    this.CargarDias(especialista);
    this.CargarHoras(especialista);
  }

  SetEspecialidad(especialidad: string) {
    this.especialidadSeleccionada = especialidad;
  }

  AgregarTurno() {
    this.cargando = true;
    let user = JSON.parse(window.localStorage.getItem('usuario') as string);
    if (this.horaSelected && this.diaSelected && this.especialistaSeleccionado && this.especialidadSeleccionada) {
      this.turno = {
        id: Guid.create().toString(),
        fecha: this.diaSelected,
        hora: this.horaSelected,
        usuario: user as Usuario,
        especialista: this.especialistaSeleccionado,
        estado: 'pendiente',
        resenia: '',
        EncuestaCompletada: false
      };
      this.firestore.setTurnos(this.turno).then(() => { this.cargando = false; this.close.emit() });
    } else {
      this.cargando = false;
      this.error.emit('Los datos no fueron completados correctamente');
    }
  }

  CargarDias(usuario: Usuario) {
    let dayToAdd;
    let dateNow = new Date();
    let currentDay: number;
    for (let day = 1; day <= 15; day++) {
      currentDay = dateNow.getDay();
      if (usuario.dias.find(dia => dia == EDays[currentDay])) {
        dayToAdd = dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear();
        this.dias.push({ name: dayToAdd, value: dayToAdd });
      }
      dateNow.setDate(dateNow.getDate() + 1);
    }
  }

  CargarHoras(usuario: Usuario) {
    let desde = Number.parseInt(usuario.desde);
    let hasta = Number.parseInt(usuario.hasta);
    let stringToAdd = "";
    let secondStringToAdd = "";
    this.horas = [{ name: usuario.desde, value: usuario.desde }];
    for (let currentNumber = desde + 1; currentNumber < hasta; currentNumber++) {

      if (currentNumber >= 10) {
        stringToAdd = currentNumber.toString() + ":" + "00";
        secondStringToAdd = currentNumber.toString() + ":" + "30";
      }
      else {
        stringToAdd = "0" + currentNumber.toString() + ":" + "00";
        secondStringToAdd = "0" + currentNumber.toString() + ":" + "30";
      }
      this.horas.push({ name: stringToAdd, value: stringToAdd });
      this.horas.push({ name: secondStringToAdd, value: secondStringToAdd });
    }
    this.horas.push({ name: usuario.hasta, value: usuario.hasta });

  }
}
