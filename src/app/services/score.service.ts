import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActionItems } from '../models/actionItems';

@Injectable({
    providedIn: 'root'
})

export class ScoreService {
    public apiURL: 'http://localhost:3100/api/';
  
    constructor(private http: HttpClient) { }
  
    generateActionItemsAndscore(answers) {
      return this.http.post('http://localhost:3100/api/score/generate', answers);
    }
    getActionItemsByUserId(payload){
      return this.http.post('http://localhost:3100/api/score/actionItemsByUserId', payload);
    }
    getScoreByUserId(payload){
      return this.http.post('http://localhost:3100/api/score/getScoreByUserId', payload);
    }
  }