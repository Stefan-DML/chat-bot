import {AngularFirestoreModule } from '@angular/fire/firestore';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
// App Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Firebase imports

import { HomePageComponent } from './home-page/home-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserModule } from './user/user.module';
import { HomePageModule } from './home-page/home-page.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { errorHandler } from './shared/interceptors/errors.interceptor';

@NgModule({
  declarations: [
    AppComponent

   ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    UserModule,
    HomePageModule
  ],
  providers: [{
    //Generic Error Interceptor
    provide: ErrorHandler,
      useClass: errorHandler,
      multi: false}
      // To be implemented
      // provide: HTTP_INTERCEPTORS,
      // useClass: HttpErrorInterceptor,
      // multi: true,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
