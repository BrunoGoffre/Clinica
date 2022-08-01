
import { Component, OnInit } from '@angular/core';
import { turno } from 'src/app/models/turno';
import { FirestoreService } from 'src/app/services/firestore.service';
import { turnosFiltrado } from '../stats/stats.component';
import { Chart, ChartItem } from 'chart.js';
import { log } from 'src/app/models/log';
import { Usuario } from 'src/app/models/usuario';


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
  chart3: any;
  listaDeLogs!: log[];
  cantidadVisitasClinica: any;
  cantidadEspecialistasPorEspecialidad: any;
  basicOptions: any;
  cantidadPacientesPorEspecialidad: any;

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
    this.BuildCantidadVisitasClinica();
    this.BuildCantidadPacientesPorEspecialidad();
    this.BuildCantidadDeEspecialistaPorEspecialidad();
    this.BuildCantidadDePacientesPorEspecialidad();
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
  BuildCantidadDePacientesPorEspecialidad() {
    let labels: any[] = [];
    let pacientes: Usuario[] = [];
    let cantidadTurnos: any[] = [];
    let existeEspecialidad = false;
    let existeUsuario = false;
    this.firestore.getTurnos().subscribe(retorno => {
      let turnos = retorno as turno[];
      turnos.forEach(item => {
        pacientes.forEach(paciente => {
          if (paciente.email == item.usuario.email) {
            existeUsuario = true;
          }
        })
        labels.forEach(label => {
          if (item.especialista.especialidad == label) {
            existeEspecialidad = true;
          }
        })
        if (existeEspecialidad == false) {
          labels.push(item.especialista.especialidad);
        }
        if (existeUsuario == false) {
          pacientes.push(item.usuario);
        }
        existeEspecialidad = false;
        existeUsuario = false;
      })

      let cantidad = 0;
      pacientes.forEach(paciente => {
        turnos.forEach(turno => {
          labels.forEach(label => {
            if (turno.especialista.especialidad == label && turno.usuario.email == paciente.email) {
              cantidad++;
            }
          })

        })
        cantidadTurnos.push(cantidad);
        cantidad = 0;
      })
      this.cantidadPacientesPorEspecialidad = {
        labels: labels,
        datasets: [
          {
            data: cantidadTurnos,
            backgroundColor: ["yellow", "pink", "lightblue"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
          }
        ]
      };

    })
  }
  BuildCantidadDeEspecialistaPorEspecialidad() {
    let labels: any[] = [];
    let cantidadEspecialistas: any[] = [];
    let existeEspecialidad = false;
    let cantidad = 0;
    this.firestore.getEspecilistas().subscribe(retorno => {
      let especialistas = retorno as Usuario[];
      especialistas.forEach(item => {
        labels.forEach(label => {
          if (item.especialidad == label) {
            existeEspecialidad = true;
          }
        })
        if (existeEspecialidad == false) {
          labels.push(item.especialidad);
        }
        existeEspecialidad = false;
      })

      labels.forEach(label => {
        especialistas.forEach(especialista => {
          if (label == especialista.especialidad) {
            cantidad++;
          }
        })
        cantidadEspecialistas.push(cantidad);
        cantidad = 0;
      })

      this.cantidadEspecialistasPorEspecialidad = {
        labels: labels,
        datasets: [
          {
            data: cantidadEspecialistas,
            backgroundColor: ["blue", "red", "green"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
          }
        ]
      };
    })


  }
  BuildCantidadPacientesPorEspecialidad() {
    let labels: any[] = [];
    let pacientes: any[] = [];
    let existeEspecialidad = false;
    this.firestore.getTurnos().subscribe(retorno => {
      let turnos = retorno as turno[];
      turnos.forEach(item => {
        labels.forEach(label => {
          if (item.especialista.especialidad == label) {
            existeEspecialidad = true;
          }
        })
        if (existeEspecialidad == false) {
          labels.push(item.especialista.especialidad);
        }
        existeEspecialidad = false;
      })
      let cantidad = 0;
      labels.forEach(label => {
        turnos.forEach(turno => {
          if (label == turno.especialista.especialidad) {
            cantidad++;
          }
        })
        pacientes.push(cantidad);
        cantidad = 0;
      })

      this.chart3 = new Chart(
        document.getElementById('myChart3') as ChartItem,
        {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Turnos completados Por especialista',
              data: pacientes,
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
  BuildCantidadVisitasClinica() {
    this.firestore.getTurnos().subscribe(retorno => {
      let turnos = retorno as turno[];
      let turnosFiltrados = turnos.filter(turno => turno.estado == 'completado');
      let cantidad = turnosFiltrados.length;
      this.cantidadVisitasClinica = {
        labels: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
        datasets: [
          {
            label: 'Cantidad de turnos',
            data: [cantidad - 1, cantidad - 3, cantidad - 2],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          },
        ]
      }
    })

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'black'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#black'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        y: {
          ticks: {
            color: 'black'
          },
          grid: {
            color: 'grey'
          }
        }
      }
    };
  }
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
