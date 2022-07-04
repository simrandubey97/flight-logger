import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit {
  actionItems: any = [];

  constructor(
    private scoreService: ScoreService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.scoreService.getActionItemsByUserId({userId: user._id}).subscribe(
      response =>{
        if(response){
          this.actionItems = response;
          console.log('this.actionItems', this.actionItems);
        }
      },
      error =>{
        this.alertService.error(error.error.message);
      }
    )
  }

}
