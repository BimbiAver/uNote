import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any;
  jwtPayload = JSON.parse(atob(localStorage.getItem('access_token')!.split('.')[1])); // Get values from the token payload

  userProfile: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private ngZone: NgZone, private router: Router) {

    // Fetch user data
    this.userService.getUserData(this.jwtPayload.userId).subscribe(res => {
      this.userProfile.setValue({
        firstName: res['firstName'],
        lastName: res['lastName'],
        emailAddress: res['emailAddress'],
        password: ['']
      });
    });

    this.userProfile = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailAddress: [''],
      password: ''
    })
  }

  // Update user
  profileUpdate(): any {
    this.userService.updateUser(this.jwtPayload.userId, this.userProfile.value)
      .subscribe(() => {
        alert('Details updated successfully!');
        this.ngZone.run(() => window.location.reload());
      }, (err) => {
        alert('Operation unsuccessful, please try again!')
        console.log(err);
      });
  }
}