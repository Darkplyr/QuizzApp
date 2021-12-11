import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TutorialComponent } from './tutorial/tutorial.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'main', component: MainComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'leaderboards', component: LeaderboardsComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QuizComponent,
    ResultsComponent,
    TutorialComponent,
    LeaderboardsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates : true,
    }),
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
