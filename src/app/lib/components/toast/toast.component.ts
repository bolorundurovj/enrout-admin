import {Component} from '@angular/core';
import {ToastMessage, ToastService} from "../../services/toast.service";

@Component({
  selector: 'enr-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  messages: Array<ToastMessage> = [new ToastMessage("Some stuff", "info")];

  constructor(private toast: ToastService) {
  }

  ngOnInit() {
    this.toast.getMessages().subscribe(d => {
      this.messages = d;
    })
  }

  dismiss(itemKey: string) {
    this.toast.dismissMessage(itemKey);
  }

  afterClose(): void {
    console.log('close');
  }
}
