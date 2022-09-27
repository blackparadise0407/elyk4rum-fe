import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { NotFoundComponent } from '$shared/components/not-found/not-found.component';

import { ThreadListViewComponent } from './thread-list/components/thread-list-view/thread-list-view.component';

export const routes: Route[] = [
  {
    path: '',
    component: ThreadListViewComponent,
  },
  {
    path: 'post',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: NotFoundComponent,
  },
  {
    path: ':slug',
    component: NotFoundComponent,
  },
];
