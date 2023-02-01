import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './helpers/auth.interceptor';

import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { MainComponent } from './layouts/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotesComponent } from './components/notes/notes.component';


@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    SigninComponent,
    SignupComponent,
    AuthComponent,
    HomeComponent,
    Error404Component,
    MainComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
