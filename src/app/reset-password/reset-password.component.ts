import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm: FormGroup;
  loading = false;
  submitted = false;
  token='';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  get f() { return this.resetPassForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.resetPassForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.resetPassword(this.f.newPassword.value, this.token)
    .then(data =>{
      this.loading = false;
      this.alertService.success('password reset successfull');
    })
    .catch(error =>{
      console.log(error);
      
      this.alertService.error(error.error.message);
      this.loading = false;
    })
  }

}
