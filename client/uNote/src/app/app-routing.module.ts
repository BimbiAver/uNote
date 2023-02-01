import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from "./helpers/auth.guard";
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './layouts/main/main.component';
import { NotesComponent } from './components/notes/notes.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SigninComponent, title: 'Sign In | uNote - The simplest way to keep notes' },
      { path: 'sign-up', component: SignupComponent, title: 'Sign Up | uNote - The simplest way to keep notes' },
      { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot Password | uNote - The simplest way to keep notes' },
      { path: '', redirectTo: "sign-in", pathMatch: "full" },
      { path: '**', redirectTo: "sign-in", pathMatch: "full" }
    ],
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home | uNote - The simplest way to keep notes' },
      { path: 'notes', component: NotesComponent, title: 'Notes | uNote - The simplest way to keep notes' },
      { path: 'edit-note/:id', component: EditNoteComponent, title: 'Edit note | uNote - The simplest way to keep notes' },
      { path: 'profile', component: ProfileComponent, title: 'Profile | uNote - The simplest way to keep notes' },
      { path: '', redirectTo: "home", pathMatch: "full" }
    ],
  },
  { path: '**', component: Error404Component, pathMatch: "full" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
