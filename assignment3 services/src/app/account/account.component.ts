import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsServices } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
  // providers: [LoggingService, AccountsServices]
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingServices: LoggingService,
    private accountsService: AccountsServices) { }

  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    // console.log('A server status changed, new status: ' + status);
    this.accountsService.updateStatus(this.id, status)
    // this.loggingServices.logStatusChange(status);
  }
}
