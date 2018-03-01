import {
  Component, OnInit,
  Output,
  ViewChild, ElementRef, EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { SearchAction } from '../model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //EventEmitter is a subclass of Subject
  //@Output() onSearch = new Subject<SearchAction>();
  @Output('giphySearch') onSearch = new EventEmitter<SearchAction>();

  @ViewChild('searchForm') searchForm2: NgForm;
  //@ViewChild('queryInput') queryInput: ElementRef;

  constructor() { }

  ngOnInit() { }

  processForm(searchForm: NgForm) {

    let search: SearchAction = {
      query: searchForm.value.query,
      result: searchForm.value.result,
      timestamp: (new Date()).getTime()
    };

    console.info("Form submitted: ", search);
    //this.onSearch.next(search); //Subject
    this.onSearch.emit(search);

    //console.info("queryInput", this.queryInput.nativeElement.value);
    searchForm.reset();
  }

}
