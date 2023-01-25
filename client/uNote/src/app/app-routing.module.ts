import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent } from './layouts/auth/auth.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SigninComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: "", redirectTo: "sign-in", pathMatch: "full" },
      { path: "", component: SigninComponent }
    ],
  },
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "", component: SigninComponent }
    ],
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
