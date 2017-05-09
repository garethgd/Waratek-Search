import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from '../model/place'
import { moveInLeft } from '../animations';
import { Locations } from '../providers/locations';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  animations: [moveInLeft()],
  host: { '[@moveInLeft]': '' }
})


export class LocationDetailsComponent {

  lat: number;
  long: number;
  photoReference: string;

  @Input()
  selectedPlace: Place;

  constructor(public locations: Locations) { }

  ngAfterContentInit() {

    console.log(this.selectedPlace);

    if (this.selectedPlace) {
      this.lat = this.selectedPlace[0];
      this.long = this.selectedPlace[1];
      this.locations.getGoogleMapsLocation(this.lat, this.long)

      //GET PHOTO OF FROM LOCATION COORDINATES HERE
      this.locations.getPhoto(this.photoReference)

    }

  }
}
