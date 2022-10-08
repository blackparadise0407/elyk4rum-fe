import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

import { OutputData } from '$shared/interfaces/editorjs.interface';
import { SupabaseService } from '$shared/services/supabase.service';

import { editorConfig } from './editorjs.config';

declare const EditorJS: any;

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentEditorComponent implements OnInit, OnDestroy {
  @Output() edit = new EventEmitter<OutputData>();
  public editor!: any;
  public editorData: any;
  public editorObserver!: MutationObserver;

  private stop$ = new Subject<void>();

  constructor(private supabaseService: SupabaseService) {}

  public ngOnInit(): void {
    this.editor = new EditorJS(editorConfig(this.supabaseService));

    this.detectEditorChanges()
      .pipe(distinctUntilChanged(), debounceTime(500), takeUntil(this.stop$))
      .subscribe(() => {
        this.saveEditorData();
      });
  }

  public ngOnDestroy(): void {
    this.editorObserver.disconnect();
    this.stop$.next();
    this.stop$.complete();
  }

  public saveEditorData(): void {
    this.editor.save().then((outputData: any) => {
      this.edit.emit(outputData);
    });
  }

  private detectEditorChanges() {
    return new Observable((observer) => {
      const editorDom = document.querySelector('#editorjs')!;
      const config = { attributes: true, childList: true, subtree: true };

      this.editorObserver = new MutationObserver((mutation) => {
        observer.next(mutation);
      });

      this.editorObserver.observe(editorDom, config);
    });
  }
}
