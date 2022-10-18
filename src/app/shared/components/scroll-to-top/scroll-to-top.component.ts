import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  public windowScrolled = false;
  private stop$ = new Subject<void>();

  constructor(private router: Router) {}

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

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.stop$)
      )
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
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
