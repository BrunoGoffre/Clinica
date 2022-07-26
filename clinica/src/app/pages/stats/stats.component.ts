import { Component, OnInit } from '@angular/core';
import * as printJS from 'print-js';
import { log } from 'src/app/models/log';
import { turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestoreService } from 'src/app/services/firestore.service';

export interface turnosFiltrado {
  especialista: string;
  cantidadTurnos: number;
}
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {

  listaDeLogs!: log[];
  CantidadTurnosPorDia = [{ lunes: 1, martes: 2, miercoles: 3, jueves: 1, viernes: 1 }];
  diasPorEspecialidad!: any[];
  turnosPorMedicoEnLapstoDeTiempo: turnosFiltrado[] = [];
  turnosCompletadoPorMedicoEnLapstoDeTiempo: turnosFiltrado[] = [];
  turnosPorDia: any;
  chartOptions: any;
  turnos: turno[] = [];
  PrintableJSONEspecialidad: any[] = [];
  PrintableJSONPorDia: any[] = [];
  PrintableJSONLogs: any[] = [];

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.GetFechaUsuarioUsuario();
    this.GetTurnos();
    this.BuildTurnosPorMedicoEnLapstoDeTiempo();
    this.BuildTurnosCompletadosEnLapstoDeTiempo();
  }

  GetTurnos() {
    this.firestore.getTurnos().subscribe(retorno => {
      retorno.forEach(item => {
        this.turnos.push(item as turno);
      })
      this.BuildCantidadTurnosPorEspecialidad(this.turnos);
    })
  }
  GetFechaUsuarioUsuario() {
    this.firestore.GetLogs().subscribe(retorno => {
      this.listaDeLogs = retorno as log[];
    })
  }
  //--------------- Buildings Stats -------------------------
  BuildCantidadTurnosPorEspecialidad(turnosFuncion: turno[]) {

    interface especialidad {
      especialidad: string;
      dias: number;
    }

    let CantidadDias: especialidad[] = [];
    let Especialidades: any[] = [];

    turnosFuncion.forEach(item => {
      if (!Especialidades.includes(item.especialista.especialidad)) {
        Especialidades.push(item.especialista.especialidad);
      }
    })

    Especialidades.forEach(especialidad => {
      CantidadDias.push({ 'especialidad': especialidad, dias: 0 });
    })

    turnosFuncion.forEach(turno => {
      CantidadDias.forEach(dia => {
        if (dia.especialidad == turno.especialista.especialidad)
          dia.dias++;
      })
    });
    this.diasPorEspecialidad = CantidadDias;
  }
  BuildTurnosCompletadosEnLapstoDeTiempo() {
    let desde = Date.parse('2022/06/10');
    let hasta = Date.parse('2022/07/10');
    let turnos: turno[] = [];
    this.firestore.getTurnos().subscribe(retorno => {
      turnos = retorno as turno[];
      turnos = turnos.filter(item => item.estado == 'completado');
      turnos.forEach(item => {
        let fecha = item.fecha.split('/')
        item.fecha = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
      })
      turnos.forEach(item => {
        if (Date.parse(item.fecha) >= desde && Date.parse(item.fecha) <= hasta) {
          if (this.turnosCompletadoPorMedicoEnLapstoDeTiempo.length > 0) {
            let indice = this.turnosCompletadoPorMedicoEnLapstoDeTiempo.findIndex(ref => ref.especialista == item.especialista.nombre + " " + item.especialista.apellido);
            if (this.turnosCompletadoPorMedicoEnLapstoDeTiempo[indice])
              this.turnosCompletadoPorMedicoEnLapstoDeTiempo[indice].cantidadTurnos++;
            else
              this.turnosCompletadoPorMedicoEnLapstoDeTiempo.push({ especialista: item.especialista.nombre + ' ' + item.especialista.apellido, cantidadTurnos: 1 });
          } else {
            this.turnosCompletadoPorMedicoEnLapstoDeTiempo.push({ especialista: item.especialista.nombre + ' ' + item.especialista.apellido, cantidadTurnos: 1 });
          }
        }
      });
    })
    return this.turnosCompletadoPorMedicoEnLapstoDeTiempo;
  }
  BuildTurnosPorMedicoEnLapstoDeTiempo() {
    let desde = Date.parse('2022/06/10');
    let hasta = Date.parse('2022/07/10');
    let turnos: turno[] = [];
    this.firestore.getTurnos().subscribe(retorno => {
      turnos = retorno as turno[];
      turnos.forEach(item => {
        let fecha = item.fecha.split('/')
        item.fecha = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
      })
      turnos.forEach(item => {
        if (Date.parse(item.fecha) >= desde && Date.parse(item.fecha) <= hasta) {
          if (this.turnosPorMedicoEnLapstoDeTiempo.length > 0) {
            let indice = this.turnosPorMedicoEnLapstoDeTiempo.findIndex(ref => ref.especialista == item.especialista.nombre + " " + item.especialista.apellido);
            if (this.turnosPorMedicoEnLapstoDeTiempo[indice])
              this.turnosPorMedicoEnLapstoDeTiempo[indice].cantidadTurnos++;
            else
              this.turnosPorMedicoEnLapstoDeTiempo.push({ especialista: item.especialista.nombre + ' ' + item.especialista.apellido, cantidadTurnos: 1 });
          } else {
            this.turnosPorMedicoEnLapstoDeTiempo.push({ especialista: item.especialista.nombre + ' ' + item.especialista.apellido, cantidadTurnos: 1 });
          }
        }
      });
    })
  }
  BuildPrintableJson(tipo: string) {
    if (tipo == 'especialidad') {
      if (this.diasPorEspecialidad) {
        this.PrintableJSONEspecialidad = [];
        this.diasPorEspecialidad.forEach(item => {
          if (item.especialidad != '') {
            this.PrintableJSONEspecialidad.push({
              'Especialidad': item.especialidad,
              'Turnos': item.dias,
            })
          }
        })
      }
    } else if (tipo == 'dias') {
      this.PrintableJSONPorDia = [
        { 'Dia': 'Lunes', 'Cantidad-Turnos': 1 },
        { 'Dia': 'Martes', 'Cantidad-Turnos': 2 },
        { 'Dia': 'Miercoles', 'Cantidad-Turnos': 3 },
        { 'Dia': 'Jueves', 'Cantidad-Turnos': 1 },
        { 'Dia': 'Viernes', 'Cantidad-Turnos': 1 },
      ]
    } else if (tipo == 'logs') {
      this.listaDeLogs.forEach(item => {
        this.PrintableJSONLogs.push({
          DNI: item.usuario.DNI,
          nombre: item.usuario.nombre,
          apellido: item.usuario.apellido,
          fecha: item.fecha,
          hora: item.hora
        }
        )
      })
    }
  }
  //--------------------------------------------------------

  //--------------- Printables PDF -------------------------
  PrintJSLogs() {
    this.BuildPrintableJson('logs');
    printJS({
      documentTitle: 'Historial de logeo',
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.PrintableJSONLogs,
      type: 'json', properties: ['DNI', 'nombre', 'apellido', 'fecha', 'hora'],
      style: '.img {width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;'
    })
  }
  PrintJSTurnosPorEspecialidad() {
    this.BuildPrintableJson('especialidad');
    printJS({
      documentTitle: 'Turnos por especialidad',
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.PrintableJSONEspecialidad,
      type: 'json', properties: ['Especialidad', 'Turnos'],
      style: '.img {width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;'
    })
  }
  PrintJSTurnosPorDia() {
    this.BuildPrintableJson('dias');
    printJS({
      documentTitle: 'Turnos por dia',
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.PrintableJSONPorDia,
      type: 'json', properties: ['Dia', 'Cantidad-Turnos'],
      style: '.img {width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;'
    })
  }
  PrintJSTurnosPorEspecialista() {
    printJS({
      documentTitle: 'Turnos por dia',
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.turnosPorMedicoEnLapstoDeTiempo,
      type: 'json', properties: ['especialista', 'cantidadTurnos'],
      style: '.img {width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;'
    })
  }
  PrintJSTurnosCompletadosPorEspecialista() {
    printJS({
      documentTitle: 'Turnos por dia',
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.turnosCompletadoPorMedicoEnLapstoDeTiempo,
      type: 'json', properties: ['especialista', 'cantidadTurnos'],
      style: '.img {width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;'
    })
  }
  //--------------------------------------------------------
}
