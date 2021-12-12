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
  correctAnswer: string = "";
  currentIndex = 0;
  currentScore = 0;
  isLastQuestion = false;
  EndOfQuiz = false;
  category = "";
  difficulty = "";
  type = "";
  isWrong = false;

  constructor(public quizService: QuizApiServiceService) {}

  ngOnInit(): void {
    this.quizService.getQuestions();
  }

  ngDoCheck(): void {
    if (this.quizService.quizzes.length > 0 && !this.EndOfQuiz) {
      this.choices = this.quizService.quizzes[this.currentIndex].choices;
      this.currentQuestion = this.quizService.quizzes[this.currentIndex].question;
      this.correctAnswer = this.quizService.quizzes[this.currentIndex].answer;
      this.category = this.quizService.quizzes[this.currentIndex].question_category;
      this.difficulty = this.quizService.quizzes[this.currentIndex].difficulty;
      this.type = this.quizService.quizzes[this.currentIndex].type;
    }
  }

  startQuiz(): void {
    this.EndOfQuiz = false;
    this.currentIndex = this.quizService.currentIndex;
    this.currentScore = this.quizService.currentScore;
    this.quizService.getQuestions();
  }

  // Check if the clicked choice is correct
  checkAnswer(ev: any, choice: string): void {
    var score = this.questionPoint();
    if (choice === this.correctAnswer) { // Check if the choice is correct and color the btn accordingly
      ev.target.classList.remove('incorrect_answer');
      ev.target.classList.add('correct_answer');
      this.currentScore += score;  
    } else {
      ev.target.classList.remove('correct_answer');
      ev.target.classList.add('incorrect_answer');
      this.isWrong = true;
      this.currentScore -= score;
    }
    this.disableChoiceButtons();
    if (!this.isLastQuestion) { // while it's not the last question, enable the next button, else enable the finish button
      var nextButton = document.getElementById('nextBtn') as HTMLButtonElement;
      nextButton.removeAttribute('disabled');
    }
    else {
      var nextButton = document.getElementById('finishBtn') as HTMLButtonElement;
      nextButton.removeAttribute('disabled');
    }
  }

  nextQuestion(ev: any): void {
    this.isWrong = false;
    document.querySelectorAll('.choiceBtn').forEach((btn) => { // Remove the correct/incorrect_answer class from all choices for the next question
      btn.classList.remove('correct_answer', 'incorrect_answer');
    });
    ev.target.setAttribute('disabled', 'true'); // disable the "Next" button upon press because we are stepping into the next question
    this.currentIndex++;
    this.enableChoiceButtons();
    if (this.currentIndex === this.quizService.quizzes.length - 1) // if i finish before last question and press next, the EndOfQuiz will become true and show "Finish" on last question instead of "Next"
      this.isLastQuestion = true;
  }

  finishQuiz = (): void => {
    this.currentIndex = 0;
    this.isLastQuestion = false;
    this.EndOfQuiz = true;
    this.isWrong = false;
  };
  
  // Enables all the choice buttons
  enableChoiceButtons = (): void => {
    document.querySelectorAll('.choiceBtn').forEach((btn) => {
      btn.removeAttribute('disabled');
    });
  };

  // Disables all the choice buttons
  disableChoiceButtons = (): void => {
    document.querySelectorAll('.choiceBtn').forEach((btn) => {
      btn.setAttribute('disabled', 'true');
    });
  };

  // Calculate the correct amount of points for each question
  questionPoint(): number {
    var score;
    if (this.difficulty == "easy") {
      score = 1
    } 
    else if (this.difficulty == "medium") {
      score = 2;
    }
    else {
      score = 3;
    }
    if (this.type == "boolean") {
      score *= 2
    }
    else {
      score *=4
    }
    return score;
  }
}