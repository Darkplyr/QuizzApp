import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  categories : any =[];
  Category = this.quizService.Category

  constructor(private router : Router, private quizService : QuizApiServiceService) { 
  }

  ngOnInit(): void {
    this.categories = this.quizService.categories;
  }

  startGame(form : NgForm) : void {
    this.quizService.Category = form.value.Category;
    this.router.navigateByUrl('/quiz');
  }  
}