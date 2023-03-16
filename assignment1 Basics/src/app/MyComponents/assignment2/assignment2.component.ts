import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css']
})
export class Assignment2Component {
  status = false;
  logs: Date[] = [];


  toggle() {
    this.status = !this.status
    // this.logs.push(this.logs.length + 1);

    this.logs.push(new Date());
  }
}
