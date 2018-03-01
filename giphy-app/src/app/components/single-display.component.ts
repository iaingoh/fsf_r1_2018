import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-display',
  templateUrl: './single-display.component.html',
  styleUrls: ['./single-display.component.css']
})
export class SingleDisplayComponent implements OnInit {

  @Input() giphyURL: string = '';

  constructor() { }

  ngOnInit() {
  }

}
