import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cargando: boolean = false;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(7)]]
  })

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } { return this.loginForm.controls; }

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
