import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { ThreadCreateViewComponent } from './components/thread-create-view/thread-create-view.component';
import { ThreadDetailViewComponent } from './components/thread-detail-view/thread-detail-view.component';
import { ThreadListViewComponent } from './components/thread-list-view/thread-list-view.component';

export const routes: Route[] = [
  {
    path: '',
    component: ThreadListViewComponent,
  },
  {
    path: 'threads/post',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: ThreadCreateViewComponent,
  },
  {
    path: 'threads/:slug',
    component: ThreadDetailViewComponent,
  },
];
