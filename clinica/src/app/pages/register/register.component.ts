import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  paciente !: Paciente;
  error: string = "";
  archivo: any;
  @ViewChild('file') file !: ElementRef;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private firestore: FirestoreService, public router: Router) {
  }

  ngOnInit(): void {
  }

  cargando: boolean = false;
  registerForm = this.formBuilder.group({
    DNI: ['', [Validators.minLength(7), Validators.maxLength(8), Validators.required]],
    nombre: ['', [Validators.minLength(3), Validators.required]],
    apellido: ['', [Validators.minLength(3), Validators.required]],
    edad: ['', [Validators.required]],
    obraSocial: ['', [Validators.minLength(3), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(7), Validators.required]],
  });

  get f(): { [key: string]: AbstractControl } { return this.registerForm.controls; }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true) && !this.f[field].valid;
  }

  submit() {
    this.cargando = true;
    if (!this.registerForm.invalid) {
      this.paciente = this.registerForm.value as Paciente;
      this.auth.Register(this.paciente).then((retorno) => {
        if ((retorno as firebase.default.auth.UserCredential).user?.email) {
          this.firestore.uploadImage(this.paciente.email, this.archivo).then((url) => {
            if (url != null) {
              this.paciente.imageURL1 = url;
              this.firestore.setPaciente(this.paciente).then(() => {
                this.cargando = false;
                this.firestore.usuario.next(this.paciente);
                window.localStorage.setItem('usuario', JSON.stringify(this.firestore.usuario.value));
                this.router.navigateByUrl('');
              }
              );
            } else {
              this.error = 'Cant upload image.';
              this.cargando = false;
            }
          })
        } else {
          this.error = 'Cant resolve register, try later.';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'Formulario invalido';
      console.log('error');
    }
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if (field != "") {

      if (this.f[field].hasError("required")) {
        retorno = "Empty.";
      }
      else if (this.f[field].getError('email')) {
        retorno = "Invalid format";
      }
      else if (this.f[field].getError('minlength')) {
        retorno = "At least " + this.f[field].getError('minlength')['requiredLength'] + " characters";
      }
    }
    return retorno;
  }

  onChangeSelect() {
    if (this.f["rol"].value == "especialista") {
      this.registerForm.addControl("especialidad", new FormControl('', Validators.required));
      this.registerForm.removeControl("obraSocial");
    }
    else if (this.f["rol"].value == "paciente") {
      this.registerForm.addControl("obraSocial", new FormControl('', Validators.required));
      this.registerForm.removeControl("especialidad");
    }
  }

  onChangeFile() {
    let file = this.file.nativeElement.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.archivo = reader.result;
    };
  }
}
