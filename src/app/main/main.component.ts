import { HttpClient } from '@angular/common/http';
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

  gamemodes : any =[];
  GameMode = this.quizService.GameMode

  constructor(private router : Router, private quizService : QuizApiServiceService) { 
  }

  ngOnInit(): void {
    this.gamemodes = this.quizService.gamemodes;
  }

  Settings() : void {
    this.router.navigateByUrl('/settings');
  }

  startGame() : void {
    for(let i=0; i < this.gamemodes.length; i++)
    {
      if(this.quizService.GameMode == this.gamemodes[i].name)
      {
        this.quizService.Category = this.gamemodes[i].category;
        this.quizService.Type = this.gamemodes[i].type;
        this.quizService.Difficulty = this.gamemodes[i].difficulty;
        this.quizService.Amount = this.gamemodes[i].nbQuestion;
        break;
      }
    }
    this.router.navigateByUrl('/quiz');
  }  

  updadeGamemode(form:NgForm) : void {
    for(let i=0; i < this.gamemodes.length; i++)
    {
      if(form.value.GameMode == this.gamemodes[i].name)
      {
        this.quizService.GameMode = this.gamemodes[i].name;
        break;
      }
    }
  }
}