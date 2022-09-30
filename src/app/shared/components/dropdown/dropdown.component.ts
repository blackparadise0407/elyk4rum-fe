import { Component, Input } from '@angular/core';
import { MenuPositionX } from '@angular/material/menu';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropDownComponent {
  @Input() menuClass: string = '';
  @Input() xPosition: MenuPositionX = 'after';
}
