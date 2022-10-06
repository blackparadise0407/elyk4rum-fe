import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-thread-create-view',
  templateUrl: './thread-create-view.component.html',
  styleUrls: ['./thread-create-view.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCreateViewComponent {
  public titleCtrl = new FormControl('', [Validators.required]);
  constructor() {}
}
