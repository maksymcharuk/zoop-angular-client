import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { CustomerAccountModule } from './modules/customer-account/customer-account.module';
import { StaticModule } from './modules/static/static.module';
import { SharedModule } from './shared/shared.module';

import { APIInterceptor } from './interceptors/api/api.interceptor';
import { AuthenticationInterceptor } from './interceptors/authentication/authentication.interceptor';
import { AuthenticationVerifyInterceptor } from './interceptors/authentication-verify/authentication-verify.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BackofficeModule,
    CustomerAccountModule,
    StaticModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationVerifyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
