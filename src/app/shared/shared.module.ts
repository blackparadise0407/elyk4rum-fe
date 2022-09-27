import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { DropDownComponent } from './components/dropdown/dropdown.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VarDirective } from './directives/ng-var.directive';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const _exports = [
  // Components
  NotFoundComponent,
  MainLayoutComponent,
  NavbarComponent,
  DropDownComponent,
  HeroComponent,
  // Services
  // Pipes
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
