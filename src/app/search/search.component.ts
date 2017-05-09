import { Component, OnInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Locations } from '../providers/locations';
import { moveInLeft } from '../animations';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { LocationsService } from '../services/locations.service';
import { Place } from '../model/place'
import { Directive, HostListener, HostBinding } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

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
  alreadyChecked: boolean = false;
  items: Observable<Array<string>>;
  term = new FormControl();
  places: Place[];
  values = '';
  selectedPlace: Place;
  matchedArray: Observable<Array<Place>>;
  constructor(public locations: Locations, public locationService: LocationsService, private cdRef: ChangeDetectorRef) {


  }


  ngAfterViewInit() {

    this.places = this.locationService.getPlaces();


    //Match values from streamed array to what is typed
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => this.displayMatches(data)),
      function (error) { console.log("Error happened" + error) },
      function () { console.log("the subscription is completed") }

    this.cdRef.detectChanges();
  }

  ngOnInit() {

    let locationsLoaded = this.locations.getStates()

    Promise.all([
      locationsLoaded
    ])


  }

  findMatches(wordToMatch, towns) {
    return towns.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    })

  }

  displayMatches(data) {

    this.matchedArray = this.findMatches(data, this.places);
    const regexHighlight = new RegExp(data, 'gi');
    
  }

  setSelectedPlace(selectedPlace) {
    console.log(selectedPlace);
    this.selectedPlace = selectedPlace
  }


}
