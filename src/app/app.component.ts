import { Component } from '@angular/core';
import { QuizApiServiceService } from './quiz-api-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuizzApp2';

  constructor(public quizService : QuizApiServiceService) {
    
  }

  ngOnInit() {
    this.quizService.generateApiToken();
    this.quizService.getCategories();
  }
}


