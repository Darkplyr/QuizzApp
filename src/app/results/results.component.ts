import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizApiServiceService } from '../quiz-api-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  @Input() currentScore : number = 0 ;
  @Input() userName : string = "";

  constructor(public quizService : QuizApiServiceService, private router : Router, private quizC : QuizComponent, private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  restartGame() : void {
    this.quizC.startQuiz();
  }

  mainMenu() : void {
    this.router.navigateByUrl('/main');
  }

  //SaveButton has to connect to the db and upload score

  submitScore = (): void => {
    this.userName = (<HTMLInputElement>document.getElementById("name")).value;
    if (this.userName){
      /*const score: any = {
        name: this.userName,
        score: this.currentScore,
        category_id: this.quizService.Category,
      }
      this.http.post('https://mighty-lowlands-31094.herokuapp.com/scores', score)
      .subscribe((res: any) => {
      });*/
      this.toastr.clear();
      this.toastr.success('Submission successful', 'Successful');
      document.getElementById('Submit')?.setAttribute("disabled", "true");
      document.getElementById('name')?.setAttribute("disabled", "true");
    } 
    else {
      this.toastr.error('Name cannot be empty', 'Error');
    }
  }
}