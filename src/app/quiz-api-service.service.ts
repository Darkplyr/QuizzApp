import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class QuizApiServiceService {

  private apiUrl = "https://opentdb.com/api.php?amount=10&encode=url3986"

  quizzes : any = [];
  correctAnswer : string = ""
  question : string = 'question';
  answer : string = 'answer';
  choices : any = [];

  constructor(private http: HttpClient) { }

  getQuestions() : void 
  {
    fetch(this.apiUrl).then(res => res.json())
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
      }
    })
  }

  decodeArray(array : any) : any {
    for (let i = 0; i < array.length; i++) {
      array[i] = decodeURIComponent(array[i]);
    }
    return array;
  }

}


