import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '$shared/shared.module';

import { PopularThreadCardComponent } from './components/popular-thread-card/popular-thread-card.component';
import { PopularThreadsComponent } from './components/popular-threads/popular-threads.component';
import { ThreadCardComponent } from './components/thread-card/thread-card.component';
import { ThreadCreateViewComponent } from './components/thread-create-view/thread-create-view.component';
import { ThreadDetailViewComponent } from './components/thread-detail-view/thread-detail-view.component';
import { ThreadListViewComponent } from './components/thread-list-view/thread-list-view.component';
import { ThreadsService } from './shared/services/threads.service';
import { routes } from './threads.routing';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ThreadListViewComponent,
    PopularThreadsComponent,
    ThreadCardComponent,
    PopularThreadCardComponent,
    ThreadDetailViewComponent,
    ThreadCreateViewComponent,
    ContentEditorComponent,
  ],
  providers: [ThreadsService],
})
export class ThreadsModule {}
