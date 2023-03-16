import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  username = "nihal";
  create = false;
  serverStatus: string = 'offline'
  clear=true;

  users=['nihal','kumar'];

  createUser() {
    this.create = true;
    this.clear=false;
    this.users.push(this.username);
  }

  getStatus() {
    return this.serverStatus;
  }

  handleDisable(){
    this.username="";
    this.clear=true;
  }

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';

  }

  getColor() {
    return this.serverStatus == 'online' ? 'green' : 'red'
  }

}
