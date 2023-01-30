import { Component } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signinForm = this.formBuilder.group({
      emailAddress: [''],
      password: [''],
    });
  }

  // User sign-in
  userSignin() {
    this.authService.signin(this.signinForm.value);
  }
}
