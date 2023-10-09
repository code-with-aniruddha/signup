import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() 'message'!: string;

  isError(): boolean {
    return !!this.message && this.message.includes('error');
  }
}
