import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clinica';

  constructor(private firestore: FirestoreService, private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    let usuario = window.localStorage.getItem('usuario');
    if (usuario) {
      this.firestore.usuario.next(JSON.parse(usuario));
      this.auth.Login(this.firestore.usuario.value?.email as string, this.firestore.usuario.value?.password as string);
    }
  }
}
