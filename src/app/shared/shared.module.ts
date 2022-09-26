import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';

const _components = [NavbarComponent];

@NgModule({
  imports: [CommonModule],
  exports: [_components],
  declarations: [_components],
  providers: [],
})
export class SharedModule {}
