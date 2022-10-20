import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogData } from '$shared/interfaces/dialog.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  public close = new EventEmitter<void>();
  public cancel = new EventEmitter<void>();
  public confirm = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  public handleClose() {
    this.close.emit();
    this.closeDiag();
  }

  public handleCancel() {
    this.cancel.emit();
    this.closeDiag();
  }

  public handleConfirm() {
    this.confirm.emit();
    this.closeDiag();
  }

  private closeDiag() {
    this.dialogRef.close();
  }
}
