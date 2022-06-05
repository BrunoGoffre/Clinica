import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  cargando: boolean = false;
  registerForm = this.formBuilder.group({
    nombre: ['', [Validators.minLength(3), Validators.required]],
    apellido: ['', [Validators.minLength(3), Validators.required]],
    edad: ['', [Validators.required]],
    obraSocial: [['', Validators.minLength(3), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(7), Validators.required]],
    imagenesPerfil: ['', [Validators.required]]
  });

  get f(): { [key: string]: AbstractControl } { return this.registerForm.controls; }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

  submit() {
    //this.auth.Login()
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
}
