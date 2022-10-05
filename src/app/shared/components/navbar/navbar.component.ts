import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

import { LoginState } from '$shared/interfaces/shared.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public tenant = environment.auth0.tenant;

  public showNavbar = true;

  private currentPos: number = 0;

  constructor(
    public auth: AuthService<LoginState>,
    @Inject(DOCUMENT) public document: Document
  ) {}

  @HostListener('window:scroll', ['$event.target'])
  public onScroll(e: Document) {
    if (e.scrollingElement) {
      let scroll = e.scrollingElement.scrollTop;
      if (scroll > this.currentPos) {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
      this.currentPos = scroll;
    }
  }

  public login(): void {
    this.auth.loginWithRedirect({
      appState: {
        href: window.location.href,
      },
    });
  }
}
