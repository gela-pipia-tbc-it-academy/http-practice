import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './places.model';
import { ErrorService } from '../shared/error.service';

const BASE_URL = 'http://localhost:3000';

interface IResData {
  places: Place[];
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private places = signal<Place[]>([]);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();
  loadedPlaces = this.places.asReadonly();

  errorService = inject(ErrorService);
  httpClient = inject(HttpClient);

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient.put<Place[]>(`${BASE_URL}/user-places`, { placeId: place.id }).pipe(
      catchError((err) => {
        console.log(err);
        this.errorService.showError('Something went wrong adding place to user places.');
        return throwError(() => new Error('Something went wrong adding place to user places.'));
      }),
      tap({
        next: () => {
          if (!this.userPlaces().some((userPlace) => userPlace.id === place.id)) {
            this.userPlaces.update((prev) => [...prev, place]);
          } else {
            this.errorService.showError('Place is already in user places.');
          }
        },
      })
    );
  }

  removePlaceFromUserPlaces(place: Place) {
    return this.httpClient.delete(`${BASE_URL}/user-places/${place.id}`).pipe(
      tap({
        next: () => {
          this.userPlaces.update((places) => places.filter((p) => p.id !== place.id));
        },
      })
    );
  }

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'places',
      'Something went wrong fetching available places, Please try again later.'
    ).pipe(
      tap({
        next: (places) => {
          this.places.set(places);
        },
      })
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'user-places',
      'Something went wrong fetching user places, Please try again later.'
    ).pipe(
      tap({
        next: (places) => {
          this.userPlaces.set(places);
        },
      })
    );
  }

  private fetchPlaces(endpoint: string, errorMessage: string) {
    return this.httpClient.get<IResData>(`${BASE_URL}/${endpoint}`).pipe(
      map((resData) => resData.places),
      catchError((err) => {
        console.log(err);
        return throwError(() => {
          return new Error(errorMessage);
        });
      })
    );
  }
}
