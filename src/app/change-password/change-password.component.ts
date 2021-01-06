import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private authenticationService: AuthenticationService,
    private userService: UserService, 
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.changePassForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
  });
  }

  get f() { return this.changePassForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.changePassForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.changePassword(this.changePassForm.value)
    .then(response =>{
      this.loading = false;
      this.alertService.success('Password changed');
      // this.router.navigate(['/']);
    })
    .catch(error =>{
      this.alertService.error(error.error.message);
      this.loading = false;
    })
}

}
