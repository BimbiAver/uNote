import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm: FormGroup;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.titleService.setTitle("Sign In | uNote - The simplest way to keep notes");

    this.signinForm = this.formBuilder.group({
      emailAddress: [''],
      password: [''],
    });
  }

  userSignin() {
    this.authService.signin(this.signinForm.value);
  }
}
