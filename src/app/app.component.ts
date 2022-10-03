import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}
}
