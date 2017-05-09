import { Injectable } from '@angular/core';
import { Place } from '../model/place'
@Injectable()
export class LocationsService {
  private place: Place;
  private places: Place[] = [];
  constructor() { }

  setPlaces(place: Place) {
    this.places.push(place)
   
  }

  getPlaces() {
    console.log(this.places);
    return this.places;
  }
}


