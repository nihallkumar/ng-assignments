import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor:string = 'transparent';
  @Input() hightlightColor:string = 'blue';


  @HostBinding('style.backgroundColor') backgrounfColor: string = this.defaultColor;


  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    // this.renderer.setStyle(this.elRef.nativeElement,'backgroundColor','blue')
    this.backgrounfColor=this.defaultColor
  }

  @HostListener('mouseenter') mouseover(evenData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement,'backgroundColor','blue')
    this.backgrounfColor = this.hightlightColor;
  }

  @HostListener('mouseleave') mouseLeave(evenData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement,'backgroundColor','yellow')
    this.backgrounfColor = this.defaultColor
  }
}
