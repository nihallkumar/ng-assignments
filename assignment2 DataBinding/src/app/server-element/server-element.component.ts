import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewEncapsulation, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{

  @Input() element: { type: string, name: string, content: string };
  @Input() name:string;

  @ViewChild('heading',{ static: true } ) header:ElementRef;
  @ContentChild('contentParagraph',{ static: true } ) paragraph:ElementRef;

  constructor() {
    console.log('constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges  called');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit  called');
    console.log('content : ',this.header.nativeElement.textContent)
    console.log(this.paragraph)
    // console.log('content paragraph : ',this.paragraph.nativeElement.textContent)
  }

  ngDoCheck(): void {
    console.log('docheck  called');
  }

  ngAfterContentInit(): void {
    console.log('afterContentInit called');
    console.log('content paragraph : ',this.paragraph.nativeElement.textContent)

  }

  ngAfterContentChecked(): void {
    console.log('afterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('afterViewtInit called');
    console.log('content : ',this.header.nativeElement.textContent)
  }

  ngAfterViewChecked(): void {
    console.log('afterViewChecked called');
  }

  ngOnDestroy(): void {
    console.log("onDestroyed called");
  }
}
