import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { ChipComponent } from './components/chip/chip.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DropDownComponent } from './components/dropdown/dropdown.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DebounceClickDirective } from './directives/debounce-click.directive';
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
  FooterComponent,
  ScrollToTopComponent,
  FormErrorComponent,
  // Pipes
  DatePipe,
  // Directives
  DebounceClickDirective,
  VarDirective,
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    NgSelectModule,
    FormsModule,
    RouterModule,
    MatMenuModule,
  ],
  exports: [_exports],
  declarations: [_exports, ConfirmDialogComponent],
  providers: [],
})
export class SharedModule {}
