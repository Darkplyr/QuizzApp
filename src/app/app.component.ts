import { Component } from '@angular/core';
import { QuizApiServiceService } from './quiz-api-service.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "Quiz App";

  constructor(public quizService : QuizApiServiceService, public mainTitle : Title) {
  }

  ngOnInit() {
    this.quizService.getCategories();
    this.quizService.generateApiToken();
    this.mainTitle.setTitle(this.title);
  }
}


