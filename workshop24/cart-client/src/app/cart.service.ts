import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

export interface Cart {
  name: string;
  contents: string[];
  saved?: string;
}

@Injectable()
export class CartService {

  readonly SERVER = 'http://localhost:3000/api/cart'

  constructor(private httpClient: HttpClient) { }

  load(name: string): Promise<Cart> {
    const qs: HttpParams = (new HttpParams()).set('name', name);

    return (this.httpClient.get<Cart>(this.SERVER,
      {params: qs })
      .take(1).toPromise());
  }

  save(cart: Cart): Promise<any> {
    return (this.httpClient.post(this.SERVER, cart)
      .take(1).toPromise());
  }

}
