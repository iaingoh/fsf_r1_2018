import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //@ViewChild('customerForm') customerForm: NgForm;
  @ViewChild(NgForm) customerForm: NgForm;

  customers = [];

  constructor(private custSvc: CustomerService) { }

  ngOnInit() { }

  getCustomers(_customerForm: NgForm) {
    const offset = this.customerForm.value['offset'] || 0;
    const limit = this.customerForm.value['limit'] || 5;

    //shotcut for { offset: offset, limit: limit }
    this.custSvc.getAllCustomers({ offset, limit })
      .then(result => {
        console.log('>>> result: ', result);
        this.customers = result
      })
      .catch(error => {
        console.log('error: ', error);
      })

  }
}
