import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { OutputData } from '$shared/interfaces/editorjs.interface';
import { ToastService } from '$shared/services/toast.service';

import { AdditionalCreateThreadComponent } from '../additional-create-thread/additional-create-thread.component';

@Component({
  selector: 'app-thread-create-view',
  templateUrl: './thread-create-view.component.html',
  styleUrls: ['./thread-create-view.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCreateViewComponent {
  public titleCtrl = new FormControl('', [Validators.required]);
  public editorData?: OutputData;

  constructor(private dialog: MatDialog, private toast: ToastService) {}

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

    const dialogRef = this.dialog.open(AdditionalCreateThreadComponent, {});
  }
}
