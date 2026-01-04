import { Component } from '@angular/core';

import { AvailablePlaces } from './places/available-places/available-places';
import { UserPlaces } from './places/user-places/user-places';

@Component({
  selector: 'app-root',
  imports: [AvailablePlaces, UserPlaces],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
