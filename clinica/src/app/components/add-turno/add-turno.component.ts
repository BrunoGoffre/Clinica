import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.scss']
})
export class AddTurnoComponent implements OnInit {

  @Output() close = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  turnoForm = this.formBuilder.group({
    fecha: ['', [Validators.required, Validators.minLength(7)]],
    especialista: ['', [Validators.required, Validators.minLength(7)]],
    hora: ['', [Validators.required]],
  })

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } { return this.turnoForm.controls; }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
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
  onClose() {
    this.close.emit();
  }


}
