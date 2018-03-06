import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentTime = 'no time yet';

  //Inject HttpClient service into component
  constructor(private httpClient: HttpClient) { }

  getTimezone(tzForm: NgForm) {
    console.log('> timezone = ', tzForm.value.timezone);

    //Set the Content-Type

    this.httpClient.post(
      'http://localhost:3000/timezone', //request
      { tz: tzForm.value.timezone, name: 'barney' }
    )
    .take(1).toPromise()
    .then(result => {
      console.log('>> result = ', result);
    })
    .catch(error => {
      console.error('>> error = ', error);
    });

    /*
    const httpHeaders = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded');
          //.set('Accept', 'text/plain');

    //httpHeaders = httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

    //tz=abc&name=fred
    //let params0 = new HttpParams();
    //let params1 = params0.set('tz', tzForm.value.timezone);
    //let params2 = params1.set('name', 'fred');

    const params = new HttpParams()
          .set('tz', tzForm.value.timezone)
          .set('name', 'fred');

    console.log('params.toString() = ', params.toString());
    this.httpClient.post(
      'http://localhost:3000/timezone', //request
      params.toString(), //body - request body
      {
        headers: httpHeaders,
        //observe: 'response'
      })
    .take(1).toPromise()
    .then(result => {
      console.log('>> result = ', result);
      console.log('>> body = ', result.body);
    })
    .catch(error => {
      console.error('>> error = ', error);
    });
    */

  }
}
