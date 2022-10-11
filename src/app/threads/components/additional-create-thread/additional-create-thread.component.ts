import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from 'src/app/admin/shared/interfaces/categories.interface';

export interface AdditionalCreateThreadDialogData {
  categories$: Observable<Category[]>;
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
    category: new FormControl(undefined, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdditionalCreateThreadDialogData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdditionalCreateThreadComponent>
  ) {}

  public get descCtrl() {
    return this.formGroup.get('description')!;
  }

  public get tagsCtrl() {
    return this.formGroup.get('tags')!;
  }

  public get catCtrl() {
    return this.formGroup.get('category')!;
  }

  public handleCancel() {
    this.dialogRef.close();
  }

  public onSubmit() {}
}
