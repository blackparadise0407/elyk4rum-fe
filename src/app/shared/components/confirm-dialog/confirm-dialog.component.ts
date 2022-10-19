import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
  @Input() close = new EventEmitter<void>();
  @Input() cancel = new EventEmitter<void>();
  @Input() confirm = new EventEmitter<void>();
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() content = '';
  @Input() title = '';
  @Input() danger = true;
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  public ngOnInit(): void {
    console.log('Init');
  }

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
