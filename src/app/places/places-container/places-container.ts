import { Component, input } from '@angular/core';

@Component({
  selector: 'app-places-container',
  imports: [],
  templateUrl: './places-container.html',
  styleUrl: './places-container.scss',
})
export class PlacesContainer {
  title = input.required<string>();
}
