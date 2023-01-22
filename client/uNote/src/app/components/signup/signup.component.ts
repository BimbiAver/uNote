import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Sign Up | uNote - The simplest way to keep notes");
  }
}
