import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { turno } from 'src/app/models/turno';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as printJS from 'print-js'

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
  providers: [MessageService]
})
export class MiPerfilComponent implements OnInit {

  usuario = this.firestore.usuario;
  PrintableJSON: any[] = [];
  error: boolean = false;


  display: boolean = false;
  selectedDays!: string[];
  horaDesdeSelected!: string;
  horaHastaSelected!: string;
  daysOptions: any[] = [
    { name: 'Lunes', value: 'Lunes' },
    { name: 'Martes', value: 'Martes' },
    { name: 'Miercoles', value: 'Miercoles' },
    { name: 'Jueves', value: 'Jueves' },
    { name: 'Viernes', value: 'Viernes' },
  ];
  turnosCompletados!: turno[];

  constructor(private firestore: FirestoreService, private primeNGConfig: PrimeNGConfig, private messageService: MessageService) { }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
    this.getTurnosCompletadosByEmail();
  }

  onSelectTime(time: any, jornada: string) {
    if (jornada == 'desde') {
      this.horaDesdeSelected = time.target.value;
    } else if (jornada == 'hasta') {
      this.horaHastaSelected = time.target.value;
    }
  }
  AddHorarios() {
    if (this.usuario.value != null) {
      if (this.selectedDays != [] && this.horaDesdeSelected != null && this.horaHastaSelected != null) {
        this.usuario.value.dias = this.selectedDays;
        this.usuario.value.desde = this.horaDesdeSelected;;
        this.usuario.value.hasta = this.horaHastaSelected;
        this.firestore.UpdateObj('users', this.usuario.value, this.usuario.value.id);
        this.display = false;
      } else {
        this.messageService.add({ key: 'c', severity: 'error', summary: 'Error', detail: 'No todos los campos fueron cargados' });
      }
    }
  }
  getTurnosCompletadosByEmail() {
    if (this.turnosCompletados != [] && this.usuario.value?.email) {
      this.turnosCompletados = [];
      this.firestore.getTurnosPacienteByEmail(this.usuario.value.email).subscribe((retorno) => {
        retorno.forEach(item => {
          if ((item as turno).estado == 'completado') {
            this.turnosCompletados.push(item as turno);
          }
        })
      })
    }
  }
  PrintJS() {
    this.BuildPrintableJson();
    printJS({
      documentTitle: 'Historia Clinica',
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.PrintableJSON,
      type: 'json', properties: ['DNI', 'Usuario', 'Fecha', 'Hora', 'Especialista', 'Altura', 'Peso', 'Temperatura', 'Presion'],
      style: '.img {width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;'
    })
  }

  BuildPrintableJson() {
    let turno;
    if (this.turnosCompletados) {
      this.PrintableJSON = [];
      this.turnosCompletados.forEach(item => {
        turno = item as turno;
        this.PrintableJSON.push({
          'DNI': turno.usuario.DNI,
          'Usuario': turno.usuario.nombre + ' ' + turno.usuario.apellido,
          'Fecha': item.fecha,
          'Hora': turno.hora,
          'Especialista': turno.especialista.nombre + ' ' + turno.especialista.apellido,
          'Altura': turno.historiaClinica?.altura,
          'Peso': turno.historiaClinica?.peso,
          'Temperatura': turno.historiaClinica?.temperatura,
          'Presion': turno.historiaClinica?.presion
        })
      })
    }
  }
}
