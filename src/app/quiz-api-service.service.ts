import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class QuizApiServiceService {

  private apiUrl : string = "";
  public apiToken : string = "";

  quizzes : any = [];
  correctAnswer : string = ""
  question : string = 'question';
  answer : string = 'answer';
  choices : any = [];

  constructor(private http: HttpClient) { 
  }

  getQuestions() : void 
  {
    this.generateApiUrl();
    this.quizzes=[];
    this.http.get(this.apiUrl)
    .subscribe((data : any) => {
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
    console.log(this.apiUrl);
  }

  decodeArray(array : any) : any {
    for (let i = 0; i < array.length; i++) {
      array[i] = decodeURIComponent(array[i]);
    }
    return array;
  }

  generateApiUrl() : void {
    if (this.apiToken == "") {
      this.generateApiToken();
    }
    this.apiUrl = "https://opentdb.com/api.php?amount=2&encode=url3986&token=" + this.apiToken;
  }

  generateApiToken() : void {
    this.http.get("https://opentdb.com/api_token.php?command=request")
    .subscribe((data : any) => {
      if (data.response_code == 0)
      {
        this.apiToken = data.token;
      }
      console.log(this.apiToken);
      })
      
  }

}


