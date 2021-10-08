import { Component, OnInit } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { Router } from '@angular/router';

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

  Save() : void {
      this.quizService.Category=this.Category;
      this.quizService.Difficulty = this.Difficulty;
      this.quizService.Type = this.Type;
      this.quizService.Amount = (<HTMLInputElement>document.getElementById("trivia_amount")).value;
      this.router.navigateByUrl("/main");
  }

  updateSelection() : void {
    console.log(this.Category);
    console.log(this.Difficulty);
    console.log(this.Type);
  }

}
