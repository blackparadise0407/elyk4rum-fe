import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { Category } from 'src/app/admin/shared/interfaces/categories.interface';

import { Tag } from '$shared/interfaces/tags.interface';
import { TagsService } from '$shared/services/tags.service';

export interface AdditionalCreateThreadDialogData {
  categories$: Observable<Category[]>;
}

export interface AdditionalCreateThreadDialogFormData {
  description: string;
  tagIds: string[];
  categoryId: string;
}

@Component({
  selector: 'app-additional-create-thread',
  templateUrl: './additional-create-thread.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalCreateThreadComponent implements OnInit, OnDestroy {
  @Output() create = new EventEmitter<AdditionalCreateThreadDialogFormData>();

  public formGroup = new FormGroup({
    description: new FormControl(''),
    tagIds: new FormControl([]),
    categoryId: new FormControl(undefined, [Validators.required]),
  });
  public tags$?: Observable<Tag[]>;
  public selectedTags: Tag[] = [];

  private tagSearchTerm = new Subject<string>();
  private stop$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdditionalCreateThreadDialogData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdditionalCreateThreadComponent>,
    private tagsService: TagsService
  ) {}

  public ngOnInit(): void {
    this.tags$ = this.tagSearchTerm.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      switchMap((q) => this.tagsService.getTags(q))
    );
  }

  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  public get descCtrl() {
    return this.formGroup.get('description')!;
  }

  public get tagsCtrl() {
    return this.formGroup.get('tagIds')!;
  }

  public get catCtrl() {
    return this.formGroup.get('categoryId')!;
  }

  public handleCancel() {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.create.emit(this.formGroup.value);
  }

  public handleSearch({ term }: { term: string; items: Tag[] }) {
    this.tagSearchTerm.next(term);
  }

  public handleAddNewTag = async (term: string) => {
    return await this.tagsService.addTag(term).toPromise();
  };

  public handleKeyPress(e: KeyboardEvent) {
    const pattern = new RegExp(/[a-zA-Z\d_]/g);
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  }
}
