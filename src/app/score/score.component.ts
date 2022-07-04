import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  public scoreData: any = [];
  constructor(
    private scoreService: ScoreService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.scoreService.getScoreByUserId({userId: user._id}).subscribe(
      response =>{
        if(response){
          this.scoreData = response;
          console.log('this.scoreData', this.scoreData);
        }
      },
      error =>{
        this.alertService.error(error.error.message);
      }
    )
  }

}
