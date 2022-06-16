import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  admin !: boolean;
  constructor() { }

  ngOnInit(): void {
    this.getUser();

  }
  getUser() {
    let user = window.localStorage.getItem('usuario');
    this.admin = user != null && JSON.parse(user)['rol'] == 'admin' ? true : false;
  }

}
