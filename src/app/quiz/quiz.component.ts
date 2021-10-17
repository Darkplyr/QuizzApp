import { Component, OnInit, DoCheck } from '@angular/core';
import { QuizApiServiceService } from '../quiz-api-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, DoCheck {
  currentQuestion: any;
  choices: any = [];
  correctAnswer: string = '';
  currentIndex = 0;
  currentScore = 0;
  isLastQuestion = false;
  EndOfQuiz = false;

  constructor(public quizService: QuizApiServiceService) {}

  ngOnInit(): void {
    this.quizService.getQuestions();
  }

  ngDoCheck(): void {
    if (this.quizService.quizzes.length > 0 && !this.EndOfQuiz) {
      this.choices = this.quizService.quizzes[this.currentIndex].choices;
      this.currentQuestion =
        this.quizService.quizzes[this.currentIndex].question;
      this.correctAnswer = this.quizService.quizzes[this.currentIndex].answer;
    }
  }

  startQuiz(): void {
    this.EndOfQuiz = false;
    this.currentIndex = this.quizService.currentIndex;
    this.currentScore = this.quizService.currentScore;
    this.quizService.getQuestions();
  }

  checkAnswer(ev: any, choice: string): void {

    // Check if the choice is correct and color the btn accordingly
    if (choice === this.correctAnswer) {
      ev.target.classList.remove('incorrect_answer');
      ev.target.classList.add('correct_answer');
      
      this.currentScore++;
    } else {
      ev.target.classList.remove('correct_answer');
      ev.target.classList.add('incorrect_answer');
    }

    this.disableChoiceButtons();

    // while it's not the last question, enable the next button, else enable the finish button
    if (!this.isLastQuestion) {
      var nextButton = document.getElementById('nextBtn') as HTMLButtonElement;
      nextButton.removeAttribute('disabled');
    }else{
      var nextButton = document.getElementById('finishBtn') as HTMLButtonElement;
      nextButton.removeAttribute('disabled');
    }
  }

  nextQuestion(ev: any): void {

    // Remove the correct/incorrect_answer class from all choices for the next question
    document.querySelectorAll('.choiceBtn').forEach((btn) => {
      btn.classList.remove('correct_answer', 'incorrect_answer');
    });

    // disable the "Next" button upon press because we are stepping into the next question
    ev.target.setAttribute('disabled', 'true');

    this.currentIndex++;

    this.enableChoiceButtons();

    // if i finish question 9 and press next, the EndOfQuiz will become true and show "Finish" on question 10 instead of "Next"
    if (this.currentIndex === this.quizService.quizzes.length - 1)
      this.isLastQuestion = true;
  }

  finishQuiz = (): void => {
    this.currentIndex = 0;
    this.isLastQuestion = false;
    this.EndOfQuiz = true;
  };
  
  enableChoiceButtons = (): void => {
    document.querySelectorAll('.choiceBtn').forEach((btn) => {
      btn.removeAttribute('disabled');
    });
  };

  disableChoiceButtons = (): void => {
    document.querySelectorAll('.choiceBtn').forEach((btn) => {
      btn.setAttribute('disabled', 'true');
    });
  };
}
