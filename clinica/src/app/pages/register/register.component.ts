import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { resolve } from 'dns';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  rolSelected: boolean = false;
  paciente !: Usuario;
  error: string = "";
  listaUsuarios: Array<Usuario> = [];
  archivo: any;
  rol !: string;
  @ViewChild('file') file !: ElementRef;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private firestore: FirestoreService, public router: Router) {
  }

  ngOnInit(): void {

    this.firestore.getPacientes().subscribe((retorno) => { retorno.forEach((item) => { this.listaUsuarios.push(item as Usuario) }) });
    this.AdminValid();
  }
  admin: boolean = false;
  cargando: boolean = false;
  registerForm = this.formBuilder.group({
    DNI: ['', [Validators.minLength(7), Validators.maxLength(8), Validators.required]],
    nombre: ['', [Validators.minLength(3), Validators.required]],
    apellido: ['', [Validators.minLength(3), Validators.required]],
    edad: ['', [Validators.required]],
    rol: ['', [Validators.minLength(3), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(7), Validators.required]],
  });

  get f(): { [key: string]: AbstractControl } { return this.registerForm.controls; }

  isNotValidField(field: string): boolean {
    if (this.f[field]) {
      return (this.f[field].touched || this.f[field].dirty == true) && !this.f[field].valid;
    } else {
      return false;
    }
  }

  submit() {
    console.log("Entre");
    this.cargando = true;
    if (!this.registerForm.invalid) {
      this.paciente = this.registerForm.value as Usuario;
      if (this.IsRepetedEmail(this.paciente.email, this.listaUsuarios)) {
        this.error = 'Email already in use';
        this.cargando = false;
      } else {

        this.auth.Register(this.paciente).then((retorno) => {
          if ((retorno as firebase.default.auth.UserCredential).user?.email) {
            this.firestore.uploadImage(this.paciente.email, this.archivo).then((url) => {
              if (url != null) {
                this.paciente.imageURL1 = url;
                this.paciente.rol = this.rol;
                this.paciente.activo = 'true';
                this.firestore.setPaciente(this.paciente).then(() => {
                  this.cargando = false;
                  this.firestore.usuario.next(this.paciente);
                  window.localStorage.setItem('usuario', JSON.stringify(this.firestore.usuario.value));
                  this.router.navigateByUrl('home');
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
      }
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

  onChangeFile() {
    let file = this.file.nativeElement.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.archivo = reader.result;
    };
  }
  obtenerRol(rol: string) {
    this.rolSelected = true;
    this.rol = rol;
    this.f['rol'].setValue(this.rol);

    if (this.f["rol"].value == "especialista") {
      this.registerForm.addControl("especialidad", new FormControl('', Validators.required));
      this.registerForm.removeControl("obraSocial");
    }
    else if (this.f["rol"].value == "paciente") {
      this.registerForm.addControl("obraSocial", new FormControl('', Validators.required));
      this.registerForm.removeControl("especialidad");
    }
  }

  AdminValid() {
    let user = window.localStorage.getItem('usuario');
    if (user != null && JSON.parse(user)['rol'] == 'admin') {
      this.admin = true;
    }
  }
  // IsRepetedEmail(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {

  //     let emailVerified = null;
  //     const value = control.value;

  //     if (!value) {
  //       console.log(value);
  //       return null;
  //     } else {
  //       console.log('entre else');
  //       this.firestore.getPacientes().subscribe((retorno) => {
  //         retorno.forEach((item) => {
  //           if ((item as Usuario).email == value) {
  //             console.log('encontre el email');
  //             emailVerified = null;
  //           }
  //           else {
  //             emailVerified = { emailRepeated: true };
  //           }

  //         })
  //       }).unsubscribe();
  //     }
  //     return emailVerified;
  //   }
  // }

  IsRepetedEmail(email: string, listaUsuarios: Array<Usuario>) {

    let emailRepeated = false;

    listaUsuarios.forEach((item) => {
      if (item.email == email) {
        emailRepeated = true;
      }
    })
    return emailRepeated;
  }
}


