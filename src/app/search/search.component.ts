import { Component, OnInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Locations } from '../providers/locations';
import { moveInLeft } from '../animations';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [moveInLeft()],
  host: { '[@moveInLeft]': '' }
})
export class SearchComponent implements OnInit {
  towns = [];
  searchElement: ElementRef;
  state: string = '';
  model: string = 'fdsf';
  items: Observable<Array<string>>;
  term = new FormControl();
  constructor(public locations: Locations) {


  }


  ngOnInit() {

    
    this.items = this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.locations.getStates(term));
  }

  findMatches(wordToMatch, towns) {
    return towns.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    })

  }

  displayMatches() {

    const searchInput = document.querySelector('#search');

    // searchInput.addEventListener('change', f)
  }
  // onKey(event: any) { // without type info
  //   event.target.value + ' | ';

  //   let locationsLoaded = this.locations.getStates();
  //   console.log(this.model);
  // }
  ngOnChanges(model: SimpleChanges) {

    // let locationsLoaded = this.locations.getStates();

    // Promise.all([

    //   locationsLoaded
    // ]).then((result) => {

    //   this.towns = result;
    //   console.log(this.towns);
    // })

    this.displayMatches();
  }

}
