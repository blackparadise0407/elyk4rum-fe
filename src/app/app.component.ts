import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { HttpWrapper } from '$shared/services/http-wrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private http: HttpWrapper
  ) {}

  ngOnInit(): void {
    this.http.get('api/config').subscribe(console.log);
  }
}
