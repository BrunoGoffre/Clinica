import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  admin !: boolean;
  rol !: string;
  constructor() { }

  ngOnInit(): void {
    this.getUser();

  }
  getUser() {
    let user = window.localStorage.getItem('usuario');
    this.rol = user != null ? JSON.parse(user)['rol'] : '';
  }

}
