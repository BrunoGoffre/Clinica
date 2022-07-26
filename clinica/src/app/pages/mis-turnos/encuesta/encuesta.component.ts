import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  @Output() close = new EventEmitter();
  toggleResponse!: boolean;
  valueRange: any = 0;
  constructor() {
  }

  ngOnInit(): void {

  }
  Close() {
    this.close.emit();
  }
}
