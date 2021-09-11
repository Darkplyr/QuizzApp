import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuizComponent } from './quiz/quiz.component';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class QuizApiServiceService {

  private apiUrl = "https://opentdb.com/api.php?amount=1&encode=url3986"

  constructor(private http: HttpClient) { }

  getQuestions() : Observable<QuizComponent[]>
  {
    return this.http.get<QuizComponent[]>(this.apiUrl)
    .pipe(
      tap(_ => console.log("questionCalled")),
    )
  }
}


