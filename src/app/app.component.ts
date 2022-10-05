import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject, takeUntil } from 'rxjs';

import { CategoriesService } from './admin/shared/services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private stop$ = new Subject<void>();

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private categoriesService: CategoriesService
  ) {}

  public ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.stop$))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
