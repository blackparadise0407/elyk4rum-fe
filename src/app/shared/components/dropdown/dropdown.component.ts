import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuPositionX } from '@angular/material/menu';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent {
  @Input() menuClass: string = '';
  @Input() xPosition: MenuPositionX = 'after';
}
