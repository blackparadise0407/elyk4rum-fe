import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { shadeColor } from '$shared/utils/color.util';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent implements OnInit {
  @Input() label = '';
  @Input() color = '';
  @Input() iconColor = '';
  @Input() icon = '';
  @Input() small = false;
  @Output() iconClick = new EventEmitter<void>();
  @Output() chipClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    if (this.color && !this.iconColor) {
      this.iconColor = shadeColor(this.color, -50);
    }
  }

  public handleIconClick(event: MouseEvent) {
    event.stopPropagation();
    this.iconClick.emit();
  }

  public handleChipClick() {
    this.chipClick.emit();
  }
}
