import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { AlertService } from '../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  public scoreData: any = [];
  id: '';
  constructor(
    private scoreService: ScoreService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.scoreService.getScoreByUserId({userId: this.id}).subscribe(
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
