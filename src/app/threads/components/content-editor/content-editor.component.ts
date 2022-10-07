import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { debounceTime, Observable, skip, Subject, takeUntil } from 'rxjs';

import { SupabaseService } from '$shared/services/supabase.service';
import { buildMarkup } from '$shared/utils/editorjs.util';

import { editorConfig } from './editorjs.config';

declare const EditorJS: any;

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentEditorComponent implements OnInit, OnDestroy {
  public editor!: any;
  public editorData: any;
  public editorObserver!: MutationObserver;
  public markup = '';

  private stop$ = new Subject<void>();

  constructor(
    private supabaseService: SupabaseService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.editor = new EditorJS(editorConfig(this.supabaseService));

    this.detectEditorChanges()
      .pipe(debounceTime(500), skip(1), takeUntil(this.stop$))
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
      console.log(outputData);
      this.markup = buildMarkup(outputData);
      this.cd.detectChanges();
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
