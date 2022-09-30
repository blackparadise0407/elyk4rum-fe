import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '$shared/shared.module';

import { PopularThreadCardComponent } from './thread-list/components/popular-thread-card/popular-thread-card.component';
import { PopularThreadsComponent } from './thread-list/components/popular-threads/popular-threads.component';
import { ThreadCardComponent } from './thread-list/components/thread-card/thread-card.component';
import { ThreadListViewComponent } from './thread-list/components/thread-list-view/thread-list-view.component';
import { ThreadListComponent } from './thread-list/components/thread-list/thread-list.component';
import { routes } from './threads.routing';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ThreadListViewComponent,
    PopularThreadsComponent,
    ThreadCardComponent,
    PopularThreadCardComponent,
    ThreadListComponent,
  ],
})
export class ThreadsModule {}
