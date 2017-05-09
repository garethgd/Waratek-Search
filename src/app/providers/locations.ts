import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Place } from '../model/place'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocationsService } from '../services/locations.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//global oboe variable from oboe package
declare var oboe: any;


@Injectable()
export class Locations {
    data: any;


    private place: Place;
    private places: Place[] = [];
    private keyword: Observable<Array<string>>;
    private _places: BehaviorSubject<Place[]>;
    private apiKey: string = "AIzaSyD9DG-l3nQM0seilByyK4ye58nU7YayA38";

    private oboeService: any;
    constructor(public http: Http, public locationService: LocationsService) {

    }

    listen(): void {
        console.log("Starting Stream");

    }

    getStates() {

        // console.log(this.dataStore);
        this.listen();

        return new Promise(resolve => {
            oboe('assets/data/zips.json')
                .done(things => {

                    this.place = new Place(things._id, things.state, things.location, things.pop, things.state);
                    this.locationService.setPlaces(things)
                    this.places = new Array<Place>();
                    resolve(true);
                })


                .fail(function () {

                    // we don't got it
                });
            if (this.data) {
                return Promise.resolve(this.data);
            }





        });

    }

    getPhoto(reference: string) {
        return new Promise(resolve => {
            this.http.request('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&' + reference + '&key=AIzaSyD9DG-l3nQM0seilByyK4ye58nU7YayA38').subscribe(data => {
                console.log(data.url);
                resolve(data.url);

            })
        });
    }
    getGoogleMapsLocation(lat, lng) {
        return new Promise(resolve => {
            let coords = lat + ',' + lng;
            this.http.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coords + this.apiKey)
                .map(res => res.json()).subscribe(data => {
                    console.log(data.results);
                    this.data = data.results;
                    resolve(this.data);

                });

        });
    }

}

