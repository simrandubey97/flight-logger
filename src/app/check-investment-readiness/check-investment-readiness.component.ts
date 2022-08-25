import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScoreService } from '../services/score.service';
import { AlertService } from '../services/alert.service';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-check-investment-readiness',
  templateUrl: './check-investment-readiness.component.html',
  styleUrls: ['./check-investment-readiness.component.css']
})
export class CheckInvestmentReadinessComponent implements OnInit {
  readinessForm: FormGroup;
  question2_NO: boolean = false;
  question3_NO: boolean = false;
  question5a_NO: boolean = false;
  question6a_Yes: boolean = false;
  question8_Yes: boolean = false;
  question8a_Yes: boolean = false;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ScoreService: ScoreService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
  ) { 
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      // console.log('this.currentUser', this.currentUser);
      
      if(!this.currentUser){
        this.router.navigate(['/login']);
      }
  });
  }

  ngOnInit() {
    this.readinessForm = this.formBuilder.group({
      question1: [''],
      question2: [''],
      question2a: [''],
      question3: [''],
      question3a: [''],
      question4: [''],
      question5: [''],
      question5a: [''],
      question6: [''],
      question6a: [''],
      question7: [''],
      question8: [''],
      question8a: [''],
      question8b: ['']
    });
  }

  onSubmit() {// console.log(this.readinessForm.value)
    this.ScoreService.generateActionItemsAndscore(this.readinessForm.value)
    .subscribe(data =>{
      this.router.navigate(['/investment-readiness-score/'+this.currentUser._id]);
    },
    error =>{
      this.alertService.error(error.error.message);
    })
  }
  hideQ2(){
    this.question2_NO = false;
  }
  showQ2(){
    this.question2_NO = true;
  }
  hideQ3(){
    this.question3_NO = false;
  }
  showQ3(){
    this.question3_NO = true;
  }
  hideQ5(){
    this.question5a_NO = false;
  }
  showQ5(){
    this.question5a_NO = true;
  }
  hideQ6(){
    this.question6a_Yes = false;
  }
  showQ6(){
    this.question6a_Yes = true;
  }
  hideQ8a(){
    this.question8_Yes = false;
  }
  showQ8a(){
    this.question8_Yes = true;
  }
  showQ8b(){
    this.question8a_Yes = true;
  }
  
}
