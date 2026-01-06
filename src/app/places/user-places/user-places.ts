import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainer } from '../shared/places-container/places-container';
import { HttpClient } from '@angular/common/http';
import { Places } from "../shared/places/places";
import { PlacesService } from '../places.service';
import { Place } from '../places.model';

@Component({
  selector: 'app-user-places',
  imports: [PlacesContainer, Places],
  templateUrl: './user-places.html',
  styleUrl: './user-places.scss',
})
export class UserPlaces implements OnInit {
  isFetching = signal(false);
  error = signal('');
  
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);
  
  placesService = inject(PlacesService);

  places = this.placesService.loadedUserPlaces;

  onRemovePlace(place: Place) {
    const subscription = this.placesService.removePlaceFromUserPlaces(place).subscribe();
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.isFetching.set(true);

    const subscription = this.placesService.loadUserPlaces()
      .subscribe({
        error: (err) => {
          this.error.set(err.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
  }
}
