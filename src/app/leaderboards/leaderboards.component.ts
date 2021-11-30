import { Component, DoCheck, OnInit } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit , DoCheck {

  Scores : any = [];

  gamemodes : any =[];
  GameMode = this.quizService.GameMode

  constructor(public quizService: QuizApiServiceService) { }

  ngOnInit(): void {
    this.quizService.getScores();
    this.gamemodes = this.quizService.gamemodes;
  }

  ngDoCheck(): void {
    this.Scores = this.quizService.scores;
  }

  updadeGamemode(form:NgForm) : void {
    this.quizService.GameMode = form.value.GameMode;
    this.quizService.getScores();
  }

}
