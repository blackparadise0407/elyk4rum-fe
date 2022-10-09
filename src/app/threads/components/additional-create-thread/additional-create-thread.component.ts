import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AdditionalCreateThreadDialogData {
  onClose: () => void;
}

@Component({
  selector: 'app-additional-create-thread',
  templateUrl: './additional-create-thread.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalCreateThreadComponent {
  public formGroup = new FormGroup({
    description: new FormControl(''),
    tags: new FormControl([]),
    category: new FormControl(undefined),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdditionalCreateThreadDialogData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdditionalCreateThreadComponent>
  ) {}

  public get descCtrl() {
    return this.formGroup.get('description');
  }

  public get tagsCtrl() {
    return this.formGroup.get('tags');
  }

  public get catCtrl() {
    return this.formGroup.get('category');
  }

  public handleCancel() {
    this.dialogRef.close();
  }
}
