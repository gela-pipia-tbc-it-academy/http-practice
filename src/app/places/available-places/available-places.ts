import { Component, signal } from '@angular/core';
import { Place } from '../places.model';
import { PlacesContainer } from "../places-container/places-container";
import { Places } from '../places';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainer, Places],
  templateUrl: './available-places.html',
  styleUrl: './available-places.scss',
})
export class AvailablePlaces {
  places = signal<Place[] | undefined>(undefined);
}
