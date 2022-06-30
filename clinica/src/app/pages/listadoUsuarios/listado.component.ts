import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as FileSaver from 'file-saver';
import { Usuario } from 'src/app/models/usuario';
import { turno } from 'src/app/models/turno';
import * as printJS from 'print-js'


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  cargando: boolean = false;
  users: Array<Usuario> = [];
  displayDialog: boolean = false;
  turnosCompletados !: any[];
  AllturnosCompletados !: any[];
  displayDialogAddUsuario: boolean = false;
  diplayEspecialidades = false;
  especialidades: any[] = [];
  PrintableJSON: any[] = [];

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getUsers().then(() => this.cargando = true);
    this.GetEspecialidades();
    this.GetTurnosCompletados();
  }
  async getUsers() {
    await this.firestore.getPacientes().subscribe((retorno) => {
      retorno.forEach((item) => {
        if ((item as Usuario).rol != 'admin')
          this.users.push(item as Usuario);
      })
      this.cargando = false;
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "users");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "export" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  GetTurnosCompletadosPorEmail(email: string) {
    this.turnosCompletados = [];
    this.firestore.getTurnosPacienteByEmail(email).subscribe((retorno) => {
      retorno.forEach(item => {
        if ((item as turno).estado == 'completado') {
          this.turnosCompletados.push(item as turno);
        }
      })
    })
  }
  GetTurnosCompletados() {
    this.AllturnosCompletados = [];
    this.firestore.getTurnos().subscribe((retorno) => {
      retorno.forEach(item => {
        if ((item as turno).estado == 'completado') {
          this.AllturnosCompletados.push(item as turno);
        }
      })
    })

  }
  MostrarDialog(usuario: Usuario) {
    if (usuario.rol == 'paciente') {
      this.GetTurnosCompletadosPorEmail(usuario.email);
      this.displayDialog = true;
    }
  }
  GetEspecialidades() {
    this.cargando = true;
    this.firestore.getEspecilistas().subscribe((retorno) => {
      retorno.forEach((item) => {
        this.especialidades.push((item as Usuario).especialidad);
      })
    });
  }

  PrintJS(especialidad: string) {
    this.BuildPrintableJson(especialidad);
    printJS({
      documentTitle: 'Historia Clinica Filtrada por: ' + especialidad,
      header: '<h1><img class="img" src="../../../assets/clinica-logo2.jpg"></h1>',
      printable: this.PrintableJSON,
      type: 'json', properties: ['DNI', 'Usuario', 'Fecha', 'Hora', 'Especialista', 'Especialidad', 'Altura', 'Peso', 'Temperatura', 'Presion'],
      style: '.img { width: 100px; height:100px; border-radius:30px;}',
      gridHeaderStyle: 'font-size:23px; border: 1px solid lightgray; margin-bottom: -1px;',
      gridStyle: 'font-size:23px; border: 1px solid lightgray; margin-bottom: -1px;'
    })
  }

  BuildPrintableJson(especialidad: string) {
    let turno;
    if (this.AllturnosCompletados) {
      this.PrintableJSON = [];
      this.AllturnosCompletados.forEach(item => {
        turno = item as turno;
        if (turno.especialista.especialidad == especialidad) {
          this.PrintableJSON.push({
            'DNI': turno.usuario.DNI,
            'Usuario': turno.usuario.nombre + ' ' + turno.usuario.apellido,
            'Fecha': item.fecha,
            'Hora': turno.hora,
            'Especialista': turno.especialista.nombre + ' ' + turno.especialista.apellido,
            'Especialidad': turno.especialista.especialidad,
            'Altura': turno.historiaClinica?.altura,
            'Peso': turno.historiaClinica?.peso,
            'Temperatura': turno.historiaClinica?.temperatura,
            'Presion': turno.historiaClinica?.presion
          })
        }
      })
      console.log(this.PrintableJSON);
    }
  }
}
