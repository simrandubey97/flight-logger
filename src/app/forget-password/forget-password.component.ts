import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  });
  }

  get f() { return this.forgetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.forgetPassword(this.f.email.value)
    .then(success=>{
      this.loading = false;
      this.alertService.success('Check your email for reset password link.');
    })
    .catch(error =>{
      this.alertService.error(error.error.message);
      this.loading = false;
    })
  }

}
