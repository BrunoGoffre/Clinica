import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  closeQuestion() {
    this.close.emit();
  }


}
