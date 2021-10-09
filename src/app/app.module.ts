import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'main', component: MainComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QuizComponent,
    ResultsComponent,
    SettingsComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
