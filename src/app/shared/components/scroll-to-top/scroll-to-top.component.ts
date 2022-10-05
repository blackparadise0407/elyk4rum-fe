import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  public windowScrolled = false;

  constructor() {}

  @HostListener('window:scroll', ['$event.target'])
  public onScroll(e: Document) {
    if (e.scrollingElement) {
      let scroll = e.scrollingElement.scrollTop;
      if (scroll > 100) {
        this.windowScrolled = true;
      } else if (scroll < 10) {
        this.windowScrolled = false;
      }
    }
  }

  public scrollToTop(): void {
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(() => this.scrollToTop());
      window.scrollTo(0, currentScroll - currentScroll / 8);
    }
  }
}
