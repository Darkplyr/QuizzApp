import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizApiServiceService } from '../quiz-api-service.service';

@Component({
  selector: 'app-cmp3',
  templateUrl: './cmp3.component.html',
  styleUrls: ['./cmp3.component.css']
})
export class Cmp3Component implements OnInit {

  constructor(private router : Router, private quizService : QuizApiServiceService) { 
    this.quizService.quizzes = [];
  }

  ngOnInit(): void {
  }

  startGame() : void{
    this.router.navigateByUrl('/quiz');
    this.quizService.getQuestions();
  }
}