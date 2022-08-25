import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { AlertService } from '../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit {
  actionItems: any = [];
  id = '';

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
    this.scoreService.getActionItemsByUserId({userId: this.id}).subscribe(
      response =>{
        if(response){
          this.actionItems = response;
          // console.log('this.actionItems', this.actionItems);
        }
      },
      error =>{
        this.alertService.error(error.error.message);
      }
    )
  }

}
