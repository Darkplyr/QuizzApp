import { Component, OnInit, DoCheck,  } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { Router } from '@angular/router';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, DoCheck {

  currentQuestion: any;
  choices : any = [];
  correctAnswer : string = "";
  currentIndex = 0;
  currentScore = 0;
  EndOfQuiz = false;

  constructor(private router : Router, public quizService : QuizApiServiceService) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(this.quizService.quizzes.length > 0){
      if (!this.EndOfQuiz) {
        this.currentQuestion = this.quizService.quizzes[this.currentIndex].question;
        this.choices = this.quizService.quizzes[this.currentIndex].choices;
        this.correctAnswer = this.quizService.quizzes[this.currentIndex].answer;
      }
    }
  }

  checkAnswer(choice : string) : void {
    var answerBtn = document.getElementById(choice);
    if(choice === this.correctAnswer)
    {
      answerBtn?.setAttribute("style", "background-color: #00FF00");
      this.currentScore++;
    }
    else
    {
      answerBtn?.setAttribute("style", "background-color: #FF0000");
    }

    for (let i = 0; i < this.choices.length; i++) {
      var choiceBtn = document.getElementById(this.choices[i]);
      choiceBtn?.setAttribute("disabled", "true");
    }

    var nextButton = document.getElementById("nxtBtn");
    nextButton?.removeAttribute("disabled");
  }

  nextQuestion() : void{
    this.EndOfQuiz = false;
    this.currentIndex++;
    var nextButton = document.getElementById("nxtBtn");
    nextButton?.setAttribute("disabled", "true")
    if (((this.currentIndex) % this.quizService.quizzes.length) == 0) {
      this.EndOfQuiz = true;
    }
    else {
    }
  }
}