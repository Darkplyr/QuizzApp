import { Component, Input, OnInit } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  @Input() currentScore : number = 0 ;
  constructor(public quizService : QuizApiServiceService, private router : Router, private quizC : QuizComponent) {}

  ngOnInit(): void {
  }

  restartGame() : void {
    this.quizC.startQuiz();
  }

  mainMenu() : void {
    this.router.navigateByUrl('/main');
  }

}