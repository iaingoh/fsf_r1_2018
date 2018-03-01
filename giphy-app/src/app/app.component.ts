import { Component } from '@angular/core';
import { SearchAction } from './model';
import { HttpClient, HttpParams } from '@angular/common/http';

//unlock the operators - on Observable
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  giphys: string[] = [];

  constructor(private httpClient: HttpClient) { }

  performSearch($event: SearchAction) {
    console.log(">>> AppComponent: performSearch(): ", $event);
    let qs = new HttpParams()
                  .set('api_key', '__giphy_keys__')
                  .set('q', $event.query)
                  .set('limit', $event.result + '');
    this.httpClient.get('https://api.giphy.com/v1/stickers/search', { params: qs }) //observable
        .subscribe(
          (result: any) => {
            //console.info("obs: data: ", result);
            this.giphys = [];
            for (let i of result.data)
              this.giphys.push(i.images.downsized.url);
            console.info("obs: giphys: ", this.giphys);
          },
          (error) => {
            console.info("obs: error: ", error);
          },
          () => {
            console.info("obs: done: ");
          }
        );

    /*
          .take(1) //take 1
          .toPromise() //convert to promise
          .then((result) => {
            console.info('>result = ', result);
          })
          .catch((error) => {
            console.error('>>> error: ', error);
          });
          */
  }
}
