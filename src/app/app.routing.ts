import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { NavbarComponent } from './shared/components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: NavbarComponent,
  },
];
