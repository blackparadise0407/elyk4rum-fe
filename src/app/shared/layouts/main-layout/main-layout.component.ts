import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  public shouldShowFooter = true;

  public ngOnInit(): void {
    this.shouldShowFooter = window.location.pathname !== '/threads/post';
  }
}
