import { Component, OnInit, DoCheck,  } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';

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

  constructor(public quizService : QuizApiServiceService, ) {
  }

  ngOnInit(): void {
    this.quizService.getQuestions();
  }

  ngDoCheck(): void {
    if(this.quizService.quizzes.length > 0 && !this.EndOfQuiz)
    {
        this.choices = this.quizService.quizzes[this.currentIndex].choices;
        this.currentQuestion = this.quizService.quizzes[this.currentIndex].question;
        this.correctAnswer = this.quizService.quizzes[this.currentIndex].answer;
    }
  }

  startQuiz() : void {
    this.EndOfQuiz = false;
    this.currentIndex = this.quizService.currentIndex;
    this.currentScore = this.quizService.currentScore;
    this.quizService.getQuestions();
  }

  checkAnswer(choice : string) : void {
    var answerBtn = document.getElementById(choice);
    if(choice == this.correctAnswer)
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

  nextQuestion() : void {
    this.EndOfQuiz = false;
    this.currentIndex++;
    var nextButton = document.getElementById("nxtBtn");
    nextButton?.setAttribute("disabled", "true")
    for (let i = 0; i < this.choices.length; i++) {
      var choiceBtn = document.getElementById(this.choices[i]);
      choiceBtn?.removeAttribute("disabled");
      choiceBtn?.removeAttribute("style")
    }
    if (((this.currentIndex) % this.quizService.quizzes.length) == 0)
      this.EndOfQuiz = true;
  }
}