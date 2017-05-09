import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { moveInLeft } from '../animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 animations: [moveInLeft()],
  host: { '[@moveInLeft]': '' }
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
