import { Component, OnInit } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  Settings : any = [];
  categories : any = [];
  Category = this.quizService.Category;
  Difficulty = this.quizService.Difficulty;
  Difficulties = ["any", "easy", "medium", "hard"]
  Type = this.quizService.Type;
  Types = ["any", "multiple", "boolean"];
  Amount = this.quizService.Amount;
 
  constructor(private router : Router, public quizService : QuizApiServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categories = this.quizService.categories;
  }

  Save(form : NgForm) : void {
    if (parseInt(form.value.Amount) < 2 || parseInt(form.value.Amount) > 50) {
      this.toastr.error('Number of questions cannot be below 2 or exceed 50', 'Invalid input');
    }
    else {
      this.quizService.Category = form.value.Category;
      this.quizService.Difficulty = form.value.Difficulty;
      this.quizService.Type = form.value.Type;
      this.quizService.Amount = form.value.Amount;
      this.quizService.GameMode = "0";
      this.router.navigateByUrl('/quiz');
    }
  }
}