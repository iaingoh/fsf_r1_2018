import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FilmsComponent } from './components/films.component';
import { FilmService } from './film.service';
import { FilmDetailComponent } from './components/film-detail.component';

const routes: Routes = [
  { path: '', component: FilmsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'film/:filmId', component: FilmDetailComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    FilmDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ FilmService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
