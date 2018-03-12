import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmService } from '../film.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  film = {};
  filmId = 0;

  private filmId$: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private filmSvc: FilmService) { }

  ngOnInit() {
    console.log("FilmDetail ngOnInit: ")
    //we're taking a snapshot. snapshot do not change
    //this.filmId = parseInt(this.activatedRoute.snapshot.params.filmId);
    this.filmId$ = this.activatedRoute.params.subscribe(
      (param) => {
        console.log('> param  = ', param);
        this.filmId = parseInt(param.filmId);
        this.filmSvc.getFilm(this.filmId)
          .then((result) => this.film = result)
          .catch((error) => {
            alert(`Error: ${JSON.stringify(error)}`);
          });
      }
    )
  }

  ngOnDestroy() {
    this.filmId$.unsubscribe();
  }

  prev() {
    this.filmId = this.filmId - 1;
    this.router.navigate(['/film', this.filmId])
  }

  next() {
    this.filmId = this.filmId + 1;
    this.router.navigate(['/film', this.filmId])
  }

  goBack() {
    this.router.navigate(['/' ]);
  }

}
