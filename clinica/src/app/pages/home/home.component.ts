
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  TurnosPorEspecialidad: any;
  CantidadTurnosPorDia: any;
  diasPorEspecialidad!: any[];
  turnosPorDia: any;
  chartOptions: any;
  turnos: turno[] = [];
  PrintableJSONEspecialidad: any[] = [];
  PrintableJSONPorDia: any[] = [];

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.GetTurnos().subscribe(retorno => {
      retorno.forEach(item => {
        this.turnos.push(item as turno);
      })
      this.BuildCantidadTurnosPorEspecialidad(this.turnos);
      this.BuildCantidadTurnosPorDia(this.turnos);
    })
  }

  GetTurnos() {
    return this.firestore.getTurnos();
  }

  BuildCantidadTurnosPorEspecialidad(turnosFuncion: turno[]) {

    interface especialidad {
      especialidad: string;
      dias: number;
    }

    let CantidadDias: any[] = [{ 'especialidad': '', 'dias': 0 }];
    let Especialidades: any[] = [];
    let dia;

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
    this.TurnosPorEspecialidad = {
      labels: [CantidadDias[1].especialidad, CantidadDias[2].especialidad, CantidadDias[3].especialidad],
      datasets: [
        {
          data: [CantidadDias[1].dias, CantidadDias[2].dias, CantidadDias[3].dias],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
        }
      ]
    };
  }

  BuildCantidadTurnosPorDia(turnosFuncion: turno[]) {
    this.turnosPorDia = {
      labels: ['lunes', 'martes', 'martes', 'miercoles', 'jueves', 'viernes'],
      datasets: [
        {
          label: 'Turnos por dia',
          data: [1, 2, 3, 1, 1],
          fill: false,
          backgroundColor: ["#42A5F5"],
          tension: .4
        }
      ]
    };
  }

  PrintJSTurnosPorEspecialidad() {
    this.BuildPrintableJson('especialidad');
    printJS({
      documentTitle: 'Historia Clinica',
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
      documentTitle: 'Historia Clinica',
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.PrintableJSONPorDia,
      type: 'json', properties: ['Dia', 'Cantidad-Turnos'],
      style: '.img {width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:25px; border: 1px solid lightgray; margin-bottom: -1px;'
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
    }
  }



}
