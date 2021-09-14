import { Component, OnInit, DoCheck } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, DoCheck {

  quizzes : any = [];
  correctAnswer : string = ""
  question : string = 'question';
  answer : string = 'answer';
  choices : any = [];
  questionDisplay : any;
  currentQuestion: any;
  currentIndex = 0;
  currentScore = 0;

  constructor(private quizService : QuizApiServiceService) {
    this.quizzes = this.quizService.quizzes;
    console.log(this.quizzes);
    
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.currentQuestion = this.quizzes[this.currentIndex].question;
    this.choices = this.quizzes[this.currentIndex].choices;
    this.correctAnswer = this.quizzes[this.currentIndex].answer;
  }

  checkAnswer(choice : string) : void {
    var answerBtn = document.getElementById(choice);
    if(choice === this.correctAnswer)
    {
      answerBtn?.setAttribute("style", "background-color: #00FF00");
      this.currentScore++;
      // this.createElement("#00FF00");
    }
    else
    {
      answerBtn?.setAttribute("style", "background-color: #FF0000");
      // this.createElement("#FF0000");
    }

    for (let i = 0; i < this.choices.length; i++) {
      var choiceBtn = document.getElementById(this.choices[i]);
      choiceBtn?.setAttribute("disabled", "true");
    }

    var nextButton = document.getElementById("nxtBtn");
    nextButton?.removeAttribute("disabled");
  }

  // createElement(choice : string) : void {
  //   var element = document.createElement("button");
  //   element?.setAttribute("disabled", "true");
  //   element?.setAttribute("class", "btn-progBar");
  //   element?.setAttribute("style", "background-color: " + choice +  "; border-color: " + choice);
  //   var body = document.getElementById("progBar");
  //   body?.appendChild(element);
  // }

  nextQuestion() : void{
    this.currentIndex++;
    var nextButton = document.getElementById("nxtBtn");
    nextButton?.setAttribute("disabled", "true")
    if ((this.currentIndex + 1) == 10) {
      console.log("here");
      this.quizService.getQuestions();
    }
  }
}