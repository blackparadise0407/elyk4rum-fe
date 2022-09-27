import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '$shared/shared.module';

import { PopularThreadsComponent } from './thread-list/components/popular-threads/popular-threads.component';
import { ThreadCardComponent } from './thread-list/components/thread-card/thread-card.component';
import { ThreadListViewComponent } from './thread-list/components/thread-list-view/thread-list-view.component';
import { routes } from './threads.routing';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ThreadListViewComponent,
    PopularThreadsComponent,
    ThreadCardComponent,
  ],
})
export class ThreadsModule {}
