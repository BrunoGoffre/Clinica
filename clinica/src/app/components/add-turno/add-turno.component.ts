import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.scss']
})
export class AddTurnoComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  specialtySelected: boolean = false;
  specialtystSelected !: Usuario;
  especialistas: Array<Usuario> = [];
  especialidades: Array<string> = [];
  cargando: boolean = false;
  turno !: turno;

  constructor(private formBuilder: FormBuilder, private firestore: FirestoreService) { }

  turnoForm = this.formBuilder.group({
    fecha: ['', [Validators.required,]],
    hora: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getEspecialidades().then(() => this.cargando = false);
  }

  get f(): { [key: string]: AbstractControl } { return this.turnoForm.controls; }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if (this.f[field].hasError("required")) {
      retorno = "Empty.";
    }
    else if (this.f[field].getError('email')) {
      retorno = "Invalid format";
    }
    else if (this.f[field].getError('minlength')) {
      retorno = "at least 7 characters";

    }
    return retorno;
  }
  onClose() {
    this.close.emit();
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
    this.specialtySelected = true;
    await this.firestore.getEspecilistasByEspecilidad(especilidad).subscribe((retorno) => {
      this.especialistas = [];
      retorno.forEach((item) => {
        this.especialistas.push(item as Usuario);
      });
    })
  }
  selectEspecialista(especialista: Usuario) {
    this.specialtystSelected = especialista;
    console.log(this.specialtystSelected);
  }
  submit() {
    this.cargando = true;
    let user = JSON.parse(window.localStorage.getItem('usuario') as string);
    if (!this.turnoForm.invalid) {
      this.turno = this.turnoForm.value as turno;
      this.turno.usuario = user as Usuario;
      this.turno.especialista = this.specialtystSelected;
      this.turno.estado = 'pendiente';
      this.turno.id = Guid.create().toString();
      this.turno.resenia = '';
      this.turno.EncuestaCompletada = false;
      if (this.turno) {
        this.firestore.setTurnos(this.turno).then(() => { this.cargando = false; this.close.emit() });
      } else {
        this.cargando = false;
        this.close.emit();
      }
    } else {
      this.cargando = false;
      this.close.emit();
    }
  }
}
