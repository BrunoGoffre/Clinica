
import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { FirestoreService } from 'src/app/services/firestore.service';
import { turnosFiltrado } from '../stats/stats.component';
import { Chart, ChartItem } from 'chart.js';
import { log } from 'src/app/models/log';


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
  turnosCompletadoPorMedicoEnLapstoDeTiempo: turnosFiltrado[] = [];
  turnosPorMedicoEnLapstoDeTiempo: turnosFiltrado[] = [];
  chart: any;
  chart2: any;
  listaDeLogs!: log[];

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.GetTurnos().subscribe(retorno => {
      retorno.forEach(item => {
        this.turnos.push(item as turno);
      })
      this.BuildCantidadTurnosPorEspecialidad(this.turnos);
      this.BuildCantidadTurnosPorDia(this.turnos);
    })
    this.BuildTurnosPorMedicoEnLapstoDeTiempo();
    this.BuildTurnosCompletadosEnLapstoDeTiempo();
  }

  GetTurnos() {
    return this.firestore.getTurnos();
  }
  GetFechaUsuario() {
    this.firestore.GetLogs().subscribe(retorno => {
      this.listaDeLogs = retorno as log[];
    })
  }
  //--------------- Buildings Charts -------------------------
  BuildTurnosCompletadosEnLapstoDeTiempo() {
    let desde = Date.parse('2022/06/10');
    let hasta = Date.parse('2022/07/10');
    let turnos: turno[] = [];
    let labels: any = [];
    let turnosChart: any = [];
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
      this.turnosCompletadoPorMedicoEnLapstoDeTiempo.forEach(item => {
        labels.push(item.especialista);
        turnosChart.push(item.cantidadTurnos);
      })
      turnosChart.push(10);
      this.chart2 = new Chart(
        document.getElementById('myChart2') as ChartItem,
        {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Turnos completados Por especialista',
              data: turnosChart,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
            }]
          },
          options: {}
        })
    })
  }
  BuildCantidadTurnosPorEspecialidad(turnosFuncion: turno[]) {

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
  BuildTurnosPorMedicoEnLapstoDeTiempo() {
    let desde = Date.parse('2022/06/10');
    let hasta = Date.parse('2022/07/10');
    let turnos: turno[] = [];
    let labels: any = [];
    let turnosChart: any = [];
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
      this.turnosPorMedicoEnLapstoDeTiempo.forEach(item => {
        labels.push(item.especialista);
        turnosChart.push(item.cantidadTurnos);
      })
      this.BuildBarGrafic(turnosChart, labels)
    })
  }
  BuildBarGrafic(turnos: any, labels: any) {
    turnos.push(10);
    this.chart = new Chart(
      document.getElementById('myChart') as ChartItem,
      {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Turnos Por especialista',
            data: turnos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
          }]
        },
        options: {}
      }
    );
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
  //----------------------------------------------------------
}
