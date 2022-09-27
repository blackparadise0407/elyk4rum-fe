import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { HttpWrapper } from '$shared/services/http-wrapper.service';

@Component({
  selector: 'app-thread-list-view',
  templateUrl: './thread-list-view.component.html',
})
export class ThreadListViewComponent implements OnInit {
  constructor(public auth: AuthService, private http: HttpWrapper) {}

  public ngOnInit(): void {
    this.http.get('http://localhost:8080').subscribe(console.log);
  }
}
