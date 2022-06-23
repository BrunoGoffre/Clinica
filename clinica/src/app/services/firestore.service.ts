import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Subject, windowWhen } from 'rxjs';
import { turno } from '../models/turno';
import { getStorage, ref, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usuario = new BehaviorSubject<Usuario | null>(null);
  storageFirestore = getStorage();

  constructor(private aFStore: AngularFirestore, private aFAuth: AngularFireAuth, private AFAuthService: AuthService, private storage: AngularFireStorage) { }

  public setPaciente(usuario: Usuario) {
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

  getTurnosPacienteByEmail(CurrentUserEmail: string) {
    return this.aFStore.collection('turnos', ref => ref.where('usuario.email', '==', CurrentUserEmail)).valueChanges();
  }
  getTurnosEspcialistaByEmail(CurrentUserEmail: string) {
    return this.aFStore.collection('turnos', ref => ref.where('especialista.email', '==', CurrentUserEmail)).valueChanges();
  }
  getTurnos() {
    return this.aFStore.collection('turnos').valueChanges();
  }
  setTurnos(turno: turno) {
    //return this.aFStore.collection('turnos').add(turno);
    return this.aFStore.collection('turnos').doc(turno.id).set(turno);
  }
  getEspecilistas() {
    return this.aFStore.collection('users', ref => ref.where('rol', '==', 'especialista').where('activo', '==', 'true')).valueChanges();
  }
  getEspecilistasByEspecilidad(especialidad: string) {
    return this.aFStore.collection('users', ref => ref.where('rol', '==', 'especialista').where('especialidad', '==', especialidad).where('activo', '==', 'true')).valueChanges();
  }
  UpdateObj(collection: string, obj: any, id: string = obj.id) {
    return this.aFStore.collection(collection).doc(id).set(obj, { merge: true });
  }
} 
