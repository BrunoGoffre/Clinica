import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { ChildrenOutletContexts } from '@angular/router';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => FadeIn', [
        query(':enter', [
          style({
            position: 'absolute',
            //bottom: 0,
            left: 0,
            width: '100%',
            opacity: 0
          })
        ]),
        query(':enter', [
          animate('500ms ease-out'),
          style({ opacity: 1 })
        ]),
      ]),
      transition('* => fadePage', [
        query(':enter', [
          style({
            position: 'absolute',
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateX(100%)'
          }),
        ]),
        query(':enter', [
          animate('600ms ease-out',
            style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
        ]),
      ]),
      transition('* => fadePageLeft', [
        query(':enter', [
          style({
            position: 'absolute',
            width: '100%',
            transform: 'translateX(-100%)',
            opacity: 0
          }),
        ]),
        query(':enter', [
          animate('600ms ease-out',
            style({
              opacity: 1,
              transform: 'translateX(0%)'
            }))
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'clinica';
  route: boolean = true;
  constructor(private firestore: FirestoreService, private auth: AuthService, private router: Router, private contexts: ChildrenOutletContexts) { }

  ngOnInit(): void {
    this.getRouter();
    let usuario = window.localStorage.getItem('usuario');
    if (usuario) {
      this.firestore.usuario.next(JSON.parse(usuario));
      this.auth.Login(this.firestore.usuario.value?.email as string, this.firestore.usuario.value?.password as string);
    }
  }
  ngOnDestroy(): void {

  }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  getRouter() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/login' || event['url'] == '/register') {
          this.route = false;
        } else {
          this.route = true;
        }
      }
    })
  }

}
