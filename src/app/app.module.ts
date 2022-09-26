import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { NetWorkAwarePreloadingStrategy } from '$shared/services/network-preload.service';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetWorkAwarePreloadingStrategy,
    }),
    AuthModule.forRoot({
      domain: 'dev-2qy1yb53.us.auth0.com',
      clientId: 'NxAuHySqCpe309f8PF3seQv1kE39tEKL',
    }),
  ],
  providers: [NetWorkAwarePreloadingStrategy],
  bootstrap: [AppComponent],
})
export class AppModule {}
