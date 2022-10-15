import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/admin/shared/services/categories.service';

import { OutputData } from '$shared/interfaces/editorjs.interface';
import { ToastService } from '$shared/services/toast.service';
import { ThreadsService } from '$threads/shared/services/threads.service';

import {
  AdditionalCreateThreadComponent,
  AdditionalCreateThreadDialogData,
  AdditionalCreateThreadDialogFormData,
} from '../additional-create-thread/additional-create-thread.component';

@Component({
  selector: 'app-thread-create-view',
  templateUrl: './thread-create-view.component.html',
  styleUrls: ['./thread-create-view.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCreateViewComponent implements OnDestroy {
  public titleCtrl = new FormControl('', [Validators.required]);
  public editorData?: OutputData;
  private stop$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private threadsService: ThreadsService,
    private toast: ToastService
  ) {}

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  public handleEditorChange(jsonData: OutputData) {
    this.editorData = jsonData;
  }

  public nextStep() {
    if (this.titleCtrl.errors) {
      this.toast.enqueue('Tiêu đề không được để trống', {
        variant: 'error',
      });
      return;
    }

    const dialogRef = this.dialog.open<
      AdditionalCreateThreadComponent,
      AdditionalCreateThreadDialogData
    >(AdditionalCreateThreadComponent, {
      data: {
        categories$: this.categoriesService.getAll(),
      },
    });
    dialogRef.componentInstance.create
      .pipe(takeUntil(this.stop$))
      .subscribe((result) => {
        this.handleCreateThread(result);
        dialogRef.close();
      });
  }

  private handleCreateThread(result: AdditionalCreateThreadDialogFormData) {
    this.threadsService
      .create({
        blocks: this.editorData?.blocks ?? [],
        title: this.titleCtrl.value,
        ...result,
      })
      .subscribe();
  }
}
