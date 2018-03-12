import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FilmService } from '../film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  offset = 0;
  private limit = 10;
  films = [];

  constructor(private filmSvc: FilmService, private router: Router,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('in ngOnInit')
    this.offset = this.filmSvc.cursor;
    this.loadFilm();
  }

  private loadFilm() {
    this.filmSvc.getAllFilms({offset: this.offset, limit: this.limit })
      .then((result) => { this.films = result })
      .catch((error) => { console.error(error); });
  }

  prev() {
    this.offset = this.offset - this.limit;
    this.filmSvc.cursor = this.offset;
    this.loadFilm(); //becareful
  }

  next() {
    this.offset = this.offset + this.limit;
    this.filmSvc.cursor = this.offset;
    this.loadFilm(); //becareful
  }

  showDetails(filmId: number) {
    console.log('> filmId: %d', filmId);
    this.router.navigate([ '/film', filmId ]);
  }
}
