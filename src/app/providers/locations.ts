import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Place } from '../model/place'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    private dataStore: {  // This is where we will store our data in memory
        places: Place[]
    };
    private oboeService: any;
    constructor(public http: Http) {
        this.dataStore = { places: [] };
        // this._places = <BehaviorSubject<Place[]>>new BehaviorSubject()
    }
    listen(): void {
        console.log("Starting Stream");

    }

    findMatches(wordToMatch, towns) {
        return towns.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex)
        })

    }
    getComments(term) {

        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('assets/data/zips.json')
                .map(res => <Place[]>res.json())
                .subscribe(data => {
                    // data corresponds to a list of OrderBasket
                    console.log(data);
                });


        });


    }
   
    getStates(term) {

        // console.log(this.dataStore);
        this.listen();

        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            oboe('assets/data/zips.json')
                .done(function (things) {
                    this.place = new Place(things._id, things.state, things.location, things.pop, things.state);

                    //   console.log(this.place);
                        // console.log(this.dataStore);
                    // this.dataStore.push(this.place);

                    resolve(things)


                    // we got it
                })
                .fail(function () {

                    // we don't got it
                });


        });
    }

}

