import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { DialogService } from '$shared/services/dialog.service';
import { ToastService } from '$shared/services/toast.service';
import { buildMarkup } from '$shared/utils/editorjs.util';
import { Thread } from '$threads/shared/interfaces/threads.interface';
import { ThreadsService } from '$threads/shared/services/threads.service';

@Component({
  selector: 'app-thread-detail-view',
  templateUrl: './thread-detail-view.component.html',
  styleUrls: ['./thread-detail-view.component.scss'],
})
export class ThreadDetailViewComponent implements OnInit, OnDestroy {
  public thread$?: Observable<Thread>;
  public content?: string;
  public currentUser$?: Observable<User | null | undefined>;
  private slug?: string | null;
  private threadId?: string;
  private stop$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private threadsService: ThreadsService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.currentUser$ = this.authService.user$;
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.thread$ = this.threadsService.getThreadBySlug(this.slug).pipe(
        tap((thread) => {
          this.threadId = thread.id;
          this.content = buildMarkup(thread.blocks);
        })
      );
    }
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  public handleArchive() {
    if (this.threadId) {
      const dialogRef = this.dialogService.confirm({
        title: 'Bạn có chắc chắn muốn xóa bài đăng này?',
        danger: true,
        confirmText: 'Xóa',
        cancelText: 'Hủy',
      });
      dialogRef.componentInstance.confirm
        .pipe(
          switchMap(() => this.threadsService.archive(this.threadId as string)),
          tap(() => {
            this.toastService.enqueue('Xóa bài đăng thành công');
            this.router.navigate(['/']);
          }),
          takeUntil(this.stop$)
        )
        .subscribe();
    }
  }
}
