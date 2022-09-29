import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

enum BorderColor {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
}

@Directive({
  selector: '[appBorderStyle]',
})
export class BorderStyleDirective implements OnInit {
  @Input() appBorderStyle: string;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnInit(): void {
    if (!Boolean(Date.parse(this.appBorderStyle))) {
      return;
    }
    this.renderer.addClass(
      this.elementRef.nativeElement,
      this.datetoColor(this.appBorderStyle)
    );
  }

  private datetoColor(date: string): BorderColor {
    const msinDay = 86400000;
    const currentDate = Date.now();
    const publishedDate = Date.parse(date);
    const lifeTime = (currentDate - publishedDate) / msinDay;

    console.log(lifeTime);

    if (lifeTime > 180) {
      return BorderColor.RED;
    }
    if (lifeTime < 180 && lifeTime >= 30) {
      return BorderColor.YELLOW;
    }
    if (lifeTime >= 7 && lifeTime < 30) {
      return BorderColor.GREEN;
    }
    if (lifeTime < 7) {
      return BorderColor.BLUE;
    }
  }
}
