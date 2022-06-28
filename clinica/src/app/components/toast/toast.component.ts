import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() message!: string;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
  }

}

