import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cargando: boolean = false;
  error: string = '';
  fotos = [];
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(7)]]
  })

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private fireStore: FirestoreService) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } { return this.loginForm.controls; }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

  submit() {

    this.auth.Login(this.f['email'].value, this.f['pass'].value).then((retorno) => {
      if (retorno != null) {
        this.cargando = true;
        let result = this.fireStore.getPaciente(this.f['email'].value).subscribe((retorno) => {
          if (retorno != null && retorno.length != 0) {
            this.fireStore.usuario.next(retorno[0] as Usuario);
            window.localStorage.setItem('usuario', JSON.stringify(retorno[0] as Usuario));
            result.unsubscribe();
            this.cargando = false;
            this.router.navigateByUrl('home');
          } else {
            this.error = 'error al iniciar sesion';
          }
        })
      } else {
        this.error = 'usuario o constraseña invalidos';
      }
    });
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
  autocompletado(email: string, pass: string) {
    this.f['email'].setValue(email);
    this.f['pass'].setValue(pass);
    this.submit();
  }
}
