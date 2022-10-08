import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { NotFoundComponent } from '$shared/components/not-found/not-found.component';
import { OutputData } from '$shared/interfaces/editorjs.interface';

@Component({
  selector: 'app-thread-create-view',
  templateUrl: './thread-create-view.component.html',
  styleUrls: ['./thread-create-view.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCreateViewComponent {
  public titleCtrl = new FormControl('', [Validators.required]);
  public editorData?: OutputData;

  constructor(private dialog: MatDialog) {}

  public handleEditorChange(jsonData: OutputData) {
    this.editorData = jsonData;
  }

  public openDialog() {
    this.dialog.open(NotFoundComponent);
  }
}
