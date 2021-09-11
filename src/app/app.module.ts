import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { Cmp2Component } from './cmp2/cmp2.component';
import { Cmp3Component } from './cmp3/cmp3.component';
import { Cmp1Component } from './cmp1/cmp1.component';
import { QuizComponent } from './quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'about', component: Cmp2Component },
  { path: 'main', component: Cmp3Component },
  { path: 'quiz', component: QuizComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    Cmp1Component,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
