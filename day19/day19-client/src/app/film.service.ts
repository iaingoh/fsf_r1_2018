import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FilmService {

  readonly SERVER = 'http://localhost:3000'

  cursor = 0;

  constructor(private httpClient: HttpClient) { }

  // GET /film/<filmId>
  getFilm(filmId: number): Promise<any> {
    return (
      this.httpClient.get(`${this.SERVER}/film/${filmId}`)
        .take(1).toPromise()
    );
  }

  // GET /films?limit=<n>&offset=<n>
  getAllFilms(config = {}): Promise<any> {
    //Set the query string
    let qs = new HttpParams();
    qs = qs.set('limit', config['limit'] || 20)
            .set('offset', config['offset'] || 0);
    return (
      this.httpClient.get(`${this.SERVER}/films`, { params: qs })
        .take(1).toPromise()
    );
  }

}
