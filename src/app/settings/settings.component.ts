import { Component, OnInit } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  Settings : any = [];
  categories : any =[];
  Category = 0;
  Difficulty = "any";
  Difficulties = ["any", "easy", "medium", "hard"]
  Type = "any";
  Types = ["any", "multiple", "boolean"];
  Amount ="10";
 
  constructor(private router : Router, public quizService : QuizApiServiceService) { }

  ngOnInit(): void {
    this.categories = this.quizService.categories;
  }

  Save(form : NgForm) : void {
      this.quizService.Category=form.value.Category;
      this.quizService.Difficulty = form.value.Difficulty;
      this.quizService.Type = form.value.Type;
      this.quizService.Amount = form.value.Amount;
      this.router.navigateByUrl("/main");
  }

  updateSelection() : void {
    console.log(this.Category);
    console.log(this.Difficulty);
    console.log(this.Type);
  }
}