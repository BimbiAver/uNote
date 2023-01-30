import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.titleService.setTitle("Sign Up | uNote - The simplest way to keep notes");

    this.signupForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailAddress: [''],
      password: ['']
    });
  }

  userSignup() {
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      this.signupForm.reset();
      this.router.navigate(['auth/sign-in']);
    }, error => {
      alert(error.error.error);
    });
  }
}