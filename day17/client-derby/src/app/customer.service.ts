import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(config = {}): Promise<any> {
    let qs = new HttpParams()
        .set('limit', config['limit'] || 5 )
        .set('offset', config['offset'] || 0 );

      return (
        this.httpClient.get(
          //'http://localhost:3000/customers', { params: qs })
          '/customers', { params: qs })
          .take(1).toPromise()
      );
  }
}
