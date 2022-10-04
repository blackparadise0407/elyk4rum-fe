import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { ChipComponent } from './components/chip/chip.component';
import { DropDownComponent } from './components/dropdown/dropdown.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { VarDirective } from './directives/ng-var.directive';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DatePipe } from './pipes/date.pipe';

const _exports = [
  // Components
  NotFoundComponent,
  MainLayoutComponent,
  NavbarComponent,
  DropDownComponent,
  HeroComponent,
  SpinnerComponent,
  PaginationComponent,
  ChipComponent,
  // Pipes
  DatePipe,
  // Directives
  VarDirective,
];

@NgModule({
  imports: [CommonModule, RouterModule, MatMenuModule],
  exports: [_exports],
  declarations: [_exports],
  providers: [],
})
export class SharedModule {}
