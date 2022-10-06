import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { Observable, Subject } from 'rxjs';

import { SupabaseService } from '$shared/services/supabase.service';

import { editorConfig } from './editorjs.config';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentEditorComponent implements OnInit, OnDestroy {
  public editor!: EditorJS;
  public editorData: any;
  public editorObserver!: MutationObserver;

  private stop$ = new Subject<void>();

  constructor(private supabaseService: SupabaseService) {}

  public ngOnInit(): void {
    this.editor = new EditorJS(editorConfig(this.supabaseService));

    // this.detectEditorChanges()
    //   .pipe(debounceTime(200), skip(1), takeUntil(this.stop$))
    //   .subscribe((data) => {
    //     this.saveEditorData();
    //   });
  }

  public ngOnDestroy(): void {
    this.editorObserver.disconnect();
    this.stop$.next();
    this.stop$.complete();
  }

  public saveEditorData(): void {
    this.editor.save().then((outputData) => {
      this.editorData = JSON.stringify(outputData, null, 2);
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
