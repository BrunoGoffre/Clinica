import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-finaliazar-turno',
  templateUrl: './finaliazar-turno.component.html',
  styleUrls: ['./finaliazar-turno.component.scss']
})
export class FinaliazarTurnoComponent implements OnInit {

  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(respuesta: any) {
    this.close.emit(respuesta);
  }

}
