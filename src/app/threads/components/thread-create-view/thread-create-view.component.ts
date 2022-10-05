import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-thread-create-view',
  templateUrl: './thread-create-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadCreateViewComponent {
  constructor() {}
}
