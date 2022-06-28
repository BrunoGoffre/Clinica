import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
  providers: [MessageService]
})
export class MiPerfilComponent implements OnInit {

  usuario = this.firestore.usuario;

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

  constructor(private firestore: FirestoreService, private primeNGConfig: PrimeNGConfig, private messageService: MessageService) { }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
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
}
