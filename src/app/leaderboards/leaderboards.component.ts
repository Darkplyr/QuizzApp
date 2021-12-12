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

  categories : any = [];
  Category = this.quizService.Category

  constructor(public quizService: QuizApiServiceService) { }

  ngOnInit(): void {
    this.quizService.getScores();
    this.categories = this.quizService.categories;
  }

  ngDoCheck(): void {
    this.Scores = this.quizService.scores;
  }

  updadeLeaderboard(form:NgForm) : void {
    this.quizService.Category = form.value.Category;
    this.quizService.getScores();
  }
}