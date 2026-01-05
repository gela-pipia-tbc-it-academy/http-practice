import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../places.model';
import { PlacesContainer } from '../shared/places-container/places-container';
import { Places } from '../shared/places/places';
import { PlacesService } from '../places.service';

const BASE_URL = 'http://localhost:3000';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainer, Places],
  templateUrl: './available-places.html',
  styleUrl: './available-places.scss',
})
export class AvailablePlaces implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);

  isFetching = signal(false);
  error = signal<string>('');

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces()
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (err: Error) => {
          this.error.set(err.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(place: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(place).subscribe();
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })

  }
}
