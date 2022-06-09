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
      return error;
    }
  }

  async Login(email: string, pass: string) {
    try {
      return await this.firebase.signInWithEmailAndPassword(email, pass);
    } catch (error) {
      return null;
    }
  }

  async LogOut() {
    try {
      return await this.firebase.signOut();
    } catch (error) {
      return null;
    }
  }

}
