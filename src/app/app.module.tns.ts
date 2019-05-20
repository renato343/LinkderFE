import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module.tns';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { LoginComponent } from './login/login.component';
import { TopnavComponent } from './topnav/topnav.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { AuthJwtComponent } from './auth-jwt/auth-jwt.component';
import { AuthJwt } from './auth-jwt.component/auth-jwt.component.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    LoginComponent,
    TopnavComponent,
    AuthGuardComponent,
    AuthJwtComponent,
    AuthJwt.ComponentComponent,
    AlertComponent,
    RegisterComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
