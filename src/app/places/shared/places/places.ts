import { Component, input, output } from '@angular/core';
import { Place } from '../../places.model';

@Component({
  selector: 'app-places',
  imports: [],
  templateUrl: './places.html',
  styleUrl: './places.scss',
})
export class Places {
  places = input.required<Place[]>();
  selectPlace = output<Place>();

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
