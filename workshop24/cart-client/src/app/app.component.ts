import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormArray, FormControl, FormGroup, Validators, NgForm, Form} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {CartService, Cart} from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contents: FormArray;
  cart: FormGroup;

  update: boolean[] = [];

  @ViewChild('cartForm') cartForm: NgForm;

  formObs$: Subscription;

  constructor(private fb: FormBuilder, private cartSvc: CartService) { }

  ngOnInit() {
    this.contents = this.fb.array([]);
    this.cart = this.fb.group({
      name: ['', [Validators.required] ],
      item: ['', [Validators.required] ],
      contents: this.contents
    });
  }

  canAdd(): boolean {
    return (this.cart.get('item').valid);
  }

  canLoad(): boolean {
    return (this.cart.get('name').valid);
  }

  isEmpty(): boolean {
    return (this.contents.length <= 0);
  }

  makeItemControl(value): FormGroup {
    return (this.fb.group({
      item: value
    }));
  }

  asArray(formArray: FormArray): string[] {
    const arr: string[] = [];
    for (let i = 0; i < formArray.length; i++)
      arr.push(formArray.at(i).get('item').value);
    return (arr);
  }

  clearContents() {
    for (let i = 0; i < this.contents.length; i++)
      this.contents.removeAt(i);
  }

  updateField(i) {
    this.update[i] = !this.update[i];
  }
  deleteField(i) {
    this.contents.removeAt(i);
    this.update.splice(i, 1);
  }

  addItem() {
    this.contents.push(this.makeItemControl(this.cart.get('item').value));
    this.cart.get('item').reset();
    this.update.push(true);
  }

  loadItem() {
    this.cartSvc.load(this.cart.get('name').value)
      .then((cart) => {
        this.clearContents();
        for (let i of cart.contents) {
          this.contents.push(this.makeItemControl(i));
          this.update.push(true);
        }
      })
  }

  saveItem() {
    const toSave: Cart = {
      name: this.cart.get('name').value,
      contents: this.asArray(this.contents)
    };
    this.cartSvc.save(toSave)
      .then(() => { alert('Saved'); })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }
}
