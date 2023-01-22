import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Sign In | uNote - The simplest way to keep notes");
  }
}
