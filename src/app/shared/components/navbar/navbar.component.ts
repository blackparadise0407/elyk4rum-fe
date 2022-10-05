import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

import { LoginState } from '$shared/interfaces/shared.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  public tenant = environment.auth0.tenant;

  constructor(
    public auth: AuthService<LoginState>,
    @Inject(DOCUMENT) public document: Document
  ) {}

  public ngOnInit(): void {
    this.auth.getAccessTokenSilently().subscribe(console.log);
  }

  public login(): void {
    this.auth.loginWithRedirect({
      appState: {
        href: window.location.href,
      },
    });
  }
}
