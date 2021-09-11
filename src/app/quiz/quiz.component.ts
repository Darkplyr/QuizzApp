import { Component, OnInit } from '@angular/core';
//import { QuizApiServiceService } from '../quiz-api-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizzes : any = [];
  correctAnswer : string = ""
  question : string = 'question';
  answer : string = 'answer';
  choices : any = [];

  constructor(/*private quizService : QuizApiServiceService*/) {
    this.getQuizzes();
  }

  ngOnInit(): void {
    console.log(this.quizzes);
  }

  getQuizzes() : void{
    fetch('https://opentdb.com/api.php?amount=1&encode=url3986').then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.results.length; i++) {
        let q = {
          question : decodeURIComponent(data.results[i].question),
          choices : data.results[i].incorrect_answers,
          answer : decodeURIComponent(data.results[i].correct_answer),
        }
        q.choices = this.decodeArray(q.choices);
        q.choices.splice(Math.floor(Math.random() * 4), 0, q.answer);
        this.quizzes.push(q);
        this.correctAnswer = q.answer;
      }
    })
  }

  //Decode Array
  decodeArray(array : any) : any {
    for (let i = 0; i < array.length; i++) {
      array[i] = decodeURIComponent(array[i]);
    }
    return array;
  }
}