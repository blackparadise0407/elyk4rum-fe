import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '$shared/shared.module';

import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { PopularThreadCardComponent } from './components/popular-thread-card/popular-thread-card.component';
import { PopularThreadsComponent } from './components/popular-threads/popular-threads.component';
import { ThreadCardComponent } from './components/thread-card/thread-card.component';
import { ThreadCreateViewComponent } from './components/thread-create-view/thread-create-view.component';
import { ThreadDetailViewComponent } from './components/thread-detail-view/thread-detail-view.component';
import { ThreadListViewComponent } from './components/thread-list-view/thread-list-view.component';
import { ThreadsService } from './shared/services/threads.service';
import { routes } from './threads.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TextFieldModule,
  ],
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
