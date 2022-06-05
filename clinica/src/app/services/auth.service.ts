import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Paciente } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebase: AngularFireAuth) { }

  async Register(paciente: Paciente) {
    try {
      return await this.firebase.createUserWithEmailAndPassword(paciente.email, paciente.password);
    } catch (error) {
      console.log("Error en register: ", error);
      return null;
    }
  }

  async Login(paciente: Paciente) {
    try {
      return await this.firebase.signInWithEmailAndPassword(paciente.email, paciente.password);
    } catch (error) {
      console.log("Error en login", error);
      return null;
    }
  }
}
