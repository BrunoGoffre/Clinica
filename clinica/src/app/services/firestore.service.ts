import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Paciente } from '../models/usuario';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Subject, windowWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usuario = new BehaviorSubject<Paciente | null>(null);

  constructor(private aFStore: AngularFirestore, private aFAuth: AngularFireAuth, private AFAuthService: AuthService, private storage: AngularFireStorage) { }

  public setPaciente(usuario: Paciente) {
    return this.aFStore.collection('users').add(usuario);
  }
  public getPaciente(email: string) {
    return this.aFStore.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  async uploadImage(email: string, img: any) {
    try {
      let storageRef = this.storage.ref("/users/" + email);
      let resp = await storageRef.putString(img, "data_url");

      return await resp.ref.getDownloadURL();
    }
    catch (err) {
      console.error(err);
      return null;
    }
  }
  getPacientes() {
    return this.aFStore.collection('users').valueChanges();
  }
}
