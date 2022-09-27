import { Routes } from '@angular/router';

import { NotFoundComponent } from '$shared/components/not-found/not-found.component';
import { MainLayoutComponent } from '$shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('$threads/threads.module').then((it) => it.ThreadsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
