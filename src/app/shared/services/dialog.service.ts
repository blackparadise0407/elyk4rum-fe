import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '$shared/components/confirm-dialog/confirm-dialog.component';
import { DialogOptions } from '$shared/interfaces/dialog.interface';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public confirm(opts: DialogOptions = {}) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: opts,
    });
  }
}
