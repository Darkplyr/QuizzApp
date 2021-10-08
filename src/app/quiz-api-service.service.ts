import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class QuizApiServiceService {

  private apiUrl : string = "";
  public apiToken : string = "";

  categories : any = [];
  quizzes : any = [];
  Category = 0;
  Difficulty = "any";
  Type = "any";
  Amount = "10";
  currentIndex = 0;
  currentScore = 0;

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
  }

  getCategories() : void {
    this.categories=[];
    this.http.get("https://opentdb.com/api_category.php")
    .subscribe((data : any) => {
      let c = {
        category_name : "Any Category",
        category_id : 0,
      }
      this.categories.push(c);
      for (let i = 0; i < data.trivia_categories.length; i++) {
        let c = {
          category_name : data.trivia_categories[i].name,
          category_id : data.trivia_categories[i].id,
        }
        this.categories.push(c);
      }
      console.log(this.categories);
    })
  }

  decodeArray(array : any) : any {
    for (let i = 0; i < array.length; i++) {
      array[i] = decodeURIComponent(array[i]);
    }
    return array;
  }

  generateApiUrl() : void {
    this.generateApiToken();
    if(this.Difficulty === "any")
    {
      this.Difficulty = "0";
    }
    if(this.Type === "any")
    {
      this.Type = "0";
    }
    this.apiUrl = "https://opentdb.com/api.php?amount=" + this.Amount + "&encode=url3986&token=" + this.apiToken + "&category=" + this.Category + "&difficulty=" + this.Difficulty + "&type=" + this.Type;
    console.log(this.apiUrl);
  }

  generateApiToken() : void {
    if (this.apiToken == "") 
    {
      this.http.get("https://opentdb.com/api_token.php?command=request")
      .subscribe((data : any) => {
        if (data.response_code == 0) 
          this.apiToken = data.token;
        console.log(this.apiToken);
        })
    }
  }
}


