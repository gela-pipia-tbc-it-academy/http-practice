import { Component } from '@angular/core';
import { PlacesContainer } from '../shared/places-container/places-container';

@Component({
  selector: 'app-user-places',
  imports: [PlacesContainer],
  templateUrl: './user-places.html',
  styleUrl: './user-places.scss',
})
export class UserPlaces {}
