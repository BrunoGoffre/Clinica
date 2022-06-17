import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Input() review !: string;

  constructor() { }

  ngOnInit(): void {
  }

  closeReview() {
    this.close.emit();
  }
}
