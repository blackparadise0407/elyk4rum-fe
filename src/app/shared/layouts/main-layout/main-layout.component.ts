import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  public shouldShowFooter = window.location.pathname !== '/threads/post';

  private stop$ = new Subject<void>();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.stop$)
      )
      .subscribe((event) => {
        const e = event as NavigationEnd;
        this.shouldShowFooter = !e.url.includes('/threads/post');
      });
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
