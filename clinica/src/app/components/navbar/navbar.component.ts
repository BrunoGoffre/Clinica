import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario = this.firestore.usuario;

  constructor(private firestore: FirestoreService, private auth: AuthService, private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
  }

  onClickLogOut() {
    this.auth.LogOut();
    this.firestore.usuario.next(null);
    window.localStorage.removeItem('usuario');
    this.router.navigateByUrl('login');
  }
  ChooseLanguage(language: string) {
    this.translate.use(language);
  }
}
