import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizApiServiceService } from '../quiz-api-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router : Router, private quizService : QuizApiServiceService) { 
  }

  ngOnInit(): void {
  }

  startGame() : void{
    this.quizService.getQuestions();
    this.router.navigateByUrl('/quiz');
  }
}