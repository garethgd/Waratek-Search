import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';



export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);