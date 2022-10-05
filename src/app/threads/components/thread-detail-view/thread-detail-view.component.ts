import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Thread } from '$threads/shared/interfaces/threads.interface';
import { ThreadsService } from '$threads/shared/services/threads.service';

@Component({
  selector: 'app-thread-detail-view',
  templateUrl: './thread-detail-view.component.html',
  styleUrls: ['./thread-detail-view.component.scss'],
})
export class ThreadDetailViewComponent implements OnInit {
  public thread$?: Observable<Thread>;
  private slug?: string | null;
  constructor(
    private route: ActivatedRoute,
    private threadsService: ThreadsService
  ) {}

  public ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.thread$ = this.threadsService.getThreadBySlug(this.slug);
    }
  }
}
