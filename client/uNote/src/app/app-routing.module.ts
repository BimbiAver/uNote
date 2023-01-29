import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from "./helpers/auth.guard";
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SigninComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: '', redirectTo: "sign-in", pathMatch: "full" },
      { path: '**', redirectTo: "sign-in", pathMatch: "full" }
    ],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: Error404Component, pathMatch: "full" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
