import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // newServerName = '';
  // newServerContent = '';
   @ViewChild('serverContentInput',{ static: true } ) serverContentInput:ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      // console.log(nameInput)
      serverName: nameInput.value,
      // serverContent: this.newServerContent
      serverContent:this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      // serverContent: this.newServerContent
      serverContent:this.serverContentInput.nativeElement.value
    });
  }
}
