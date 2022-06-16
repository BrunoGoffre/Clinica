import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as FileSaver from 'file-saver';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  cargando: boolean = false;
  users: Array<Usuario> = [];

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getUsers().then(() => this.cargando = true);
  }
  async getUsers() {
    await this.firestore.getPacientes().subscribe((retorno) => {
      retorno.forEach((item) => {
        this.users.push(item as Usuario);
      })
      this.cargando = false;
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.users); // Sale Data
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

}
