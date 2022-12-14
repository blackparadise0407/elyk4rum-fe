import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { APIInterceptor } from '$shared/interceptors/api.interceptor';
import { ErrorResponseInterceptor } from '$shared/interceptors/error-response.interceptor';
import { ManageHttpInterceptor } from '$shared/interceptors/manage-http.interceptor';
import { HttpCancelService } from '$shared/services/http-cancel.service';
import { NetWorkAwarePreloadingStrategy } from '$shared/services/network-preload.service';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetWorkAwarePreloadingStrategy,
    }),
    ToastrModule.forRoot(),
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      audience: environment.auth0.audience,
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.auth0.audience}/*`,
            tokenOptions: {
              audience: environment.auth0.audience,
            },
            allowAnonymous: true,
          },
        ],
      },
    }),
  ],
  providers: [
    NetWorkAwarePreloadingStrategy,
    HttpCancelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ManageHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        minWidth: 400,
        maxWidth: 640,
        closeOnNavigation: true,
        hasBackdrop: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
