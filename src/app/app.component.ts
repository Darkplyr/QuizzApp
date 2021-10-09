import { Component } from '@angular/core';
import { QuizApiServiceService } from './quiz-api-service.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public quizService : QuizApiServiceService, private title : Title) {
  }

  ngOnInit() {
    this.quizService.generateApiToken();
    this.quizService.getCategories();
    this.title.setTitle("Quiz App");
  }
}


