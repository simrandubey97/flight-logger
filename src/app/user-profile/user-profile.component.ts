import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  loading = false;
  submitted = false;
  editButton = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private userService: UserService, 
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userService.getUserDetails()
    .then(user =>{
      this.userProfileForm.patchValue(user);
    })
    .catch(error =>{
      this.alertService.error(error.error.message);
    })
    this.userProfileForm = this.formBuilder.group({
      firstname: [{value: '', disabled: true}, Validators.required],
      lastname: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  edit(){
    this.editButton = false;
    this.userProfileForm.controls['firstname'].enable();
    this.userProfileForm.controls['lastname'].enable();
    this.userProfileForm.controls['email'].enable();
  }
  save(){
    this.userService.editUserDetails(this.userProfileForm.value)
    .then(response=>{
      this.userService.getUserDetails()
      this.editButton = true;
      this.userProfileForm.controls['firstname'].disable();
      this.userProfileForm.controls['lastname'].disable();
      this.userProfileForm.controls['email'].disable();
    })
    .catch(error =>{
      this.alertService.error(error.error.message);
    })
  }

}
