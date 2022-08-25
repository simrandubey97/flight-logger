import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { ScoreService } from '../services/score.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    scoreGenerated: boolean = false;
    usersList: any = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private scoreService: ScoreService,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      
      if(!this.currentUser){
        this.router.navigate(['/login']);
      }
  });
   }

  ngOnInit() {
    this.userService.getUserDetails();
    if(this.currentUser.role === 'user'){
      this.scoreService.getScoreByUserId({userId: this.currentUser._id}).subscribe(
        response =>{
          if(response){
            this.scoreGenerated = true;
          }
        },
        error =>{
          this.alertService.error(error.error.message);
        }
      )
    }else{
      this.userService.getUsers().subscribe(
        response =>{
          if(Array.isArray(response)){
            this.usersList = response.filter(response => response.role !== 'admin');
          }
        },
        error =>{
          this.alertService.error(error.error.message);
        }
      )
    }
    // this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

}
