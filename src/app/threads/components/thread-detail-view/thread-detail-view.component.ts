import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';

import { DialogService } from '$shared/services/dialog.service';
import { buildMarkup } from '$shared/utils/editorjs.util';
import { Thread } from '$threads/shared/interfaces/threads.interface';
import { ThreadsService } from '$threads/shared/services/threads.service';

@Component({
  selector: 'app-thread-detail-view',
  templateUrl: './thread-detail-view.component.html',
  styleUrls: ['./thread-detail-view.component.scss'],
})
export class ThreadDetailViewComponent implements OnInit {
  public thread$?: Observable<Thread>;
  public content?: string;
  public currentUser$?: Observable<User | null | undefined>;
  private slug?: string | null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private threadsService: ThreadsService,
    private dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.currentUser$ = this.authService.user$;
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.thread$ = this.threadsService.getThreadBySlug(this.slug).pipe(
        tap((thread) => {
          this.content = buildMarkup(thread.blocks);
        })
      );
    }
  }

  public handleDelete() {
    const dialogRef = this.dialogService.confirm();
  }
}
