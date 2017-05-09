import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { SearchComponent } from './search/search.component';
import { Locations } from './providers/locations';
import { HomeComponent } from './home/home.component';
import { LocationsService } from './services/locations.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationDetailsComponent } from './location-details/location-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
   
 
    SearchComponent,
    HomeComponent,
    LocationDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [Locations,LocationsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
